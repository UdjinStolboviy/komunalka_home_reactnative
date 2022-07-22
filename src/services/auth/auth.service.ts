import { IAuthService } from "./auth.service.interface";
import { inject, injectable } from "inversify";
import VersionCheck from "react-native-version-check";

import { INavigationService } from "../navigation/navigation.service.interface";

import { IRESTService } from "../http/rest.service.interface";

import { IAccessToken } from "../../models/auth/access.token";


import Config from "../../config/config";
import { HttpResponse } from "../../models/http/http.response";


import { IUserAccountService } from "../user-account/user.account.service.interface";
import { IRegistration } from "../../models/auth/registration.model";

import { IOtpValid } from "../../models/auth/otp.valid.model";
import { Platform } from "react-native";
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ISessionService } from "../session/session.service.interface";

import { IAsyncStorage } from "../async-storage/async.storage.interface";


import { INotificationsService } from "../notification/notifications.service.interface";
import { IPushNotificationService } from "../push-notification/push.notification.service.interface";
import { TYPES } from "app/data/ioc/types";
import { IDBService } from "../data-base/db.service.interface";
import { GlobalStorage } from "app/data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { AuthUser } from "app/data/storage/auth/auth.user.model";
import { IUserAccount, UserAccount } from "app/data/storage/user-account/user.account.model";
import { AuthConstants } from "app/assets/constants/codes/AuthConstants";
import { Login } from "app/models/common/login.model";
import { Routes } from "app/assets/constants/codes/Routes";
import { HttpStatuses } from "app/assets/constants/codes/HttpStatuses";
import { Screens } from "app/assets/constants/codes/Screens";
import { Errors } from "app/assets/constants/codes/Errors";
import { Session } from "app/data/storage/session/session.model";




@injectable()
export class AuthService implements IAuthService {

  @inject(TYPES.DBService) dbService!: IDBService;
  @inject(TYPES.NavigationService) navigationService!: INavigationService;
  @inject(TYPES.Storage) storage!: GlobalStorage;
  @inject(TYPES.Logger) logger!: ILoggerService;
  @inject(TYPES.RESTService) restService!: IRESTService;
  @inject(TYPES.UserAccountService) userAccountService!: IUserAccountService;
  @inject(TYPES.SessionService) sessionService!: ISessionService;
  @inject(TYPES.AsyncStorage) asyncStorage!: IAsyncStorage;
  @inject(TYPES.NotificationsService) notificationsService!: INotificationsService;
  @inject(TYPES.PushNotificationService) pushNotificationService!: IPushNotificationService;



  public async socialAuth(idToken: string, type: string): Promise<void> {
    const accessToken: IAccessToken = await this.getSocialAccessToken(type, idToken);
    const authUser: AuthUser = new AuthUser(accessToken.jwt, type);
    await this.dbService.addAuthUser(authUser);
    this.storage.setAuthUser(authUser);
    const userAccount: IUserAccount = await this.userAccountService.getUserAccount();
    this.storage.setUserAccount(new UserAccount(userAccount));
    await this.setLastCompanySession();
    this.userAccountService.updateUserAccountLogin(type);
  }

  public async register(registrationRequest: IRegistration): Promise<void> {
    const accessToken: IAccessToken = await this.getLocalAccessToken(registrationRequest);
    const authUser: AuthUser = new AuthUser(accessToken.jwt, AuthConstants.LOGIN_TYPE_LOCAL);
    await this.dbService.addAuthUser(authUser);
    this.storage.setAuthUser(authUser);
    const userAccount: IUserAccount = await this.userAccountService.getUserAccount();
    this.storage.setUserAccount(new UserAccount(userAccount));
    await this.userAccountService.updateUserAccountLogin(AuthConstants.LOGIN_TYPE_LOCAL);
    //this.storage.getUserAccount().setLogin(new Login({ type: AuthConstants.LOGIN_TYPE_LOCAL }))
  }

  public async login(email: string): Promise<AuthUser> {
    const accessToken: IAccessToken = await this.getAccessTokenByEmail(email);
    const authUser: AuthUser = new AuthUser(accessToken.jwt, AuthConstants.LOGIN_TYPE_LOCAL);
    this.storage.setAuthUser(authUser);
    const userAccount: IUserAccount = await this.userAccountService.getUserAccount();
    this.storage.setUserAccount(new UserAccount(userAccount));
    this.setLastCompanySession();
    return authUser;
  }

  public async autoLogin(): Promise<void> {
    try {
      const authUser: AuthUser = await this.dbService.getAuthUser();
      if (!authUser) return;
      this.storage.setAuthUser(authUser);
      const userAccount: IUserAccount = await this.userAccountService.getUserAccount();
      this.storage.setUserAccount(new UserAccount(userAccount));
    } catch (e) {
      await this.dbService.deleteAuthUser(this.storage.getAuthUser());
    }
  }

  public async sendOTP(): Promise<void> {
    const url: string = Config.host.route + Routes.AUTH + '/otp';
    const headers = this.composeHeaders();
    const sendOTPResponse: HttpResponse = await this.restService.get(url, headers);
    if (sendOTPResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(sendOTPResponse.getBody().error);
  }

  public async confirmOTP(otp: string): Promise<IOtpValid> {
    const url: string = Config.host.route + Routes.AUTH + '/otp/confirmation';
    const headers = this.composeHeaders();
    const confirmOTPResponse: HttpResponse = await this.restService.post(url, { otp: otp }, headers);
    if (confirmOTPResponse.getStatus() !== HttpStatuses.STATUS_OK) {
      throw confirmOTPResponse.getBody();
    }
    return confirmOTPResponse.getBody() as IOtpValid;
  }

  public async confirmRegistration(token: string): Promise<void> {
    const url: string = Config.host.route + Routes.AUTH + '/confirmation';
    const headers = this.composeHeaders();
    const confirmRegistrationResponse: HttpResponse = await this.restService.post(url, { token: token }, headers);
    if (confirmRegistrationResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(confirmRegistrationResponse.getBody().error);
  }

  public async deleteAccount(): Promise<void> {
    try {
      this.navigationService.navigate(Screens._POLICY);
      await this.userAccountService.deleteUserAccount(this.storage.getUserAccount().getId());
      await this.commitLogoutActions();
      setTimeout(() => {
        this.navigationService.goBack();
        this.navigationService.navigate(Screens.STACK_AUTH, { screen: Screens._POLICY });
      }, 5000)
    } catch (e: any) {
      this.navigationService.goBack();
      this.navigationService.navigate(Screens._POLICY, {
        topText: Errors.CHECK_PUSH_PERMISSION_ERROR,
        bottomText: e.message || e.error
      })
    }
  }

  public async logout(): Promise<void> {
    try {
      this.navigationService.navigate(Screens._POLICY);
      await this.commitLogoutActions();
      this.navigationService.goBack();
      this.navigationService.navigate(Screens.STACK_AUTH, { screen: Screens._POLICY });
    } catch (e: any) {
      this.navigationService.goBack();
      this.navigationService.navigate(Screens._POLICY, {
        topText: Errors.CHECK_PUSH_PERMISSION_ERROR,
        bottomText: e.message || e.error
      })
    }
  }

  public async getAccessTokenByEmail(email: string): Promise<IAccessToken> {
    const encodedEmail = encodeURIComponent(email);
    const url: string = Config.host.route + Routes.LOGIN + `/login?email=${encodedEmail}`;
    const headers = this.composeHeaders();
    const authResponse: HttpResponse = await this.restService.get(url, headers);
    if (authResponse.getStatus() === HttpStatuses.STATUS_NOT_FOUND) throw {
      message: 'User with such email not found',
      error: 'User with such email not found'
    };
    if (authResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(authResponse.getBody() && authResponse.getBody().error);
    return authResponse.getBody() as IAccessToken;
  }

  private async commitLogoutActions(): Promise<void> {
    try {
      await this.processSocialLogout();
      await this.dbService.deleteAuthUser(this.storage.getAuthUser());
      await this.clearAsyncStorage();
      this.storage.clearStorage();
    } catch (e: any) {
      throw e;
    }
  }

  private async getSocialAccessToken(type: string, idToken: string): Promise<IAccessToken> {
    const url: string = Config.host.route + Routes.AUTH + `?type=${type}&idToken=${idToken}`;
    const headers = this.composeHeaders();
    const authResponse: HttpResponse = await this.restService.get(url, headers);
    if (authResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(authResponse.getBody() && authResponse.getBody().error);
    return authResponse.getBody() as IAccessToken;
  }

  private async getLocalAccessToken(registrationRequest: IRegistration): Promise<IAccessToken> {
    const url: string = Config.host.route + Routes.AUTH;
    const headers = this.composeHeaders();
    const authResponse: HttpResponse = await this.restService.post(url, registrationRequest, headers);
    if (authResponse.getStatus() !== HttpStatuses.STATUS_OK) throw { message: 'Error occurred' }
    return authResponse.getBody() as IAccessToken;
  }

  private async processSocialLogout() {
    const authUser = this.storage.getAuthUser();
    if (!authUser) return;
    const socialLoginType = authUser.getLoginType();
    if (socialLoginType === AuthConstants.GOOGLE_AUTH_TYPE) {
      await this.processGoogleLogout();
    }
  }

  private async processGoogleLogout() {
    try {
      if (Platform.OS === 'android') {
        // GoogleSignin.revokeAccess();
      }
      // await GoogleSignin.signOut();
    } catch (e: any) {
      this.logger.error(Errors.GOOGLE_AUTH_ERROR, e.message || e.error);
    }
  }

  private async setLastCompanySession() {
    try {
      const lastSession: Session = await this.sessionService.getCompanySession();

    } catch (e: any) {
      this.logger.error(e.message || e.error)
    }
  }

  private async clearAsyncStorage() {
    const keys = [];
    // keys.push(AsyncStorageKeys.HAND_SHAKE_INFORMATIVE_SHOWN);
    // keys.push(AsyncStorageKeys.CREATE_OPPORTUNITY_KEY);
    // await this.asyncStorage.clearKeys(keys);
  }

  private composeHeaders(): Headers {
    const headers: Headers = new Headers();
    const accessToken = this.storage.getAuthUser() && this.storage.getAuthUser().getAccessToken() || '';
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');
    headers.append('platform', Platform.OS.toLowerCase());
    headers.append('app_version', VersionCheck.getCurrentVersion())
    headers.append('firebase_analytics_client_id', this.storage.getFirebaseStorage().getAnalytics().getClientId());
    return headers;
  }

}
