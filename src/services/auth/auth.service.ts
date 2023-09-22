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


@injectable()
export class AuthService implements IAuthService {
  @inject(TYPES.DBService) dbService!: IDBService;
  @inject(TYPES.NavigationService) navigationService!: INavigationService;
  @inject(TYPES.Storage) storage!: GlobalStorage;
  @inject(TYPES.Logger) logger!: ILoggerService;
  @inject(TYPES.RESTService) restService!: IRESTService;
  @inject(TYPES.UserAccountService) userAccountService!: IUserAccountService;
  @inject(TYPES.AsyncStorage) asyncStorage!: IAsyncStorage;
  @inject(TYPES.NotificationsService) notificationsService!: INotificationsService;
  @inject(TYPES.PushNotificationService) pushNotificationService!: IPushNotificationService;



  

  public async register(registrationRequest: IRegistration): Promise<void> {
    
  }

  public async login(email: string): Promise<any> {
   
  }

  

  public async deleteAccount(): Promise<void> {
    try {
    
    } catch (e: any) {
     
    }
  }

  public async logout(): Promise<void> {
    try {
     
    } catch (e: any) {
     
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


  private async clearAsyncStorage() {
    const keys = [];
    // keys.push(AsyncStorageKeys.HAND_SHAKE_INFORMATIVE_SHOWN);
    // keys.push(AsyncStorageKeys.CREATE_OPPORTUNITY_KEY);
    // await this.asyncStorage.clearKeys(keys);
  }


}
