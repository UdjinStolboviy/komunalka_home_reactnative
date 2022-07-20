import { inject, injectable } from "inversify";
import { IUserAccountService } from "./user.account.service.interface";

import { HttpResponse } from "../../models/http/http.response";



import { IRESTService } from "../http/rest.service.interface";

import Config from "../../config/config";

import { IUpdateUserAccount } from "../../models/user-account/update.user.account.model";
import { Platform } from "react-native";

import { toJS } from "mobx";
import { ReportUserRequest } from "../../models/user-account/report.user.request";

import { UpdateUserChatInfoRequest } from "../../models/user-account/update.user.chat.info.request";
import { IUserAccount, UserAccount } from "app/data/storage/user-account/user.account.model";
import { HttpStatuses } from "app/assets/constants/codes/HttpStatuses";
import { TYPES } from "app/data/ioc/types";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { GlobalStorage } from "app/data/storage/global.storage";
import { Routes } from "app/assets/constants/codes/Routes";
import { Gift } from "app/data/storage/user-account/plan/gift.model";
import { BlockedEntities, IBlockedEntities } from "app/data/storage/blocked-entities/blocked.entities.model";

@injectable()
export class UserAccountService implements IUserAccountService {

  @inject(TYPES.Logger) logger!: ILoggerService;
  @inject(TYPES.RESTService) restService!: IRESTService;
  @inject(TYPES.Storage) storage!: GlobalStorage;

  public async getUserAccount(): Promise<IUserAccount> {
    const headers = this.composeHeaders();
    const userAccountResponse: HttpResponse = await this.restService.get(Config.host.route + Routes.AUTH, headers);
    if (userAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(userAccountResponse.getBody());
    return userAccountResponse.getBody() as IUserAccount;
  }

  public async getUserAccountByEmail(email: string): Promise<UserAccount | null> {
    const headers = this.composeHeaders();
    const url = Config.host.route + Routes.AUTH + `?email=${email}`;
    const userAccountResponse: HttpResponse = await this.restService.get(url, headers);
    if (userAccountResponse.getStatus() === HttpStatuses.STATUS_NOT_FOUND) return null;
    if (userAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(userAccountResponse.getBody());
    const userAccountBody = userAccountResponse.getBody() as IUserAccount;
    return new UserAccount(userAccountBody);
  }

  public async getUserAccountById(id: string): Promise<UserAccount> {
    const headers = this.composeHeaders();
    const url = Config.host.route + Routes.AUTH + '/' + id;
    const userAccountResponse: HttpResponse = await this.restService.get(url, headers);
    const body = userAccountResponse.getBody() as IUserAccount;
    if (userAccountResponse.getStatus() === HttpStatuses.STATUS_NOT_FOUND) {
      throw { code: HttpStatuses.STATUS_NOT_FOUND, message: `Account with ${id} not found` }
    }
    if (userAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) {
      throw body
    }
    return new UserAccount(body);
  }

  public async setUpBlockedEntities(): Promise<void> {
    try {
      const blockedEntities = await this.getBlockedEntities();
      if (blockedEntities) {
        //this.storage.getBlockedEntitiesState().setBlockedEntities(blockedEntities);
      }
    } catch (e) {
    }
  }


  private async getBlockedEntities(): Promise<BlockedEntities | null> {
    try {
      const headers = this.composeHeaders();
      const url = Config.host.route + Routes.AUTH + '/';
      const response: HttpResponse = await this.restService.get(url, headers);
      const body = response.getBody() as IBlockedEntities;
      if (response.getStatus() !== HttpStatuses.STATUS_OK) {
        throw body
      }
      return new BlockedEntities(body);
    } catch (e) {
      this.logger.error('Get blocked entities error: ', e);
      return null;
    }
  }


  public async updateUserAccountLogin(loginType: string): Promise<void> {
    const body = {
      field: "login",
      value: {
        type: loginType
      }
    };
    const headers: Headers = this.composeHeaders();
    const updateLoginTypeResponse = await this.restService.patch(Config.host.route + Routes.AUTH, body, headers);
  }


  public async updateUserAccount(updateUserAccountRequest: IUpdateUserAccount): Promise<UserAccount> {
    const headers = this.composeHeaders();
    const body = {
      field: "general",
      value: updateUserAccountRequest
    };
    const updateUserAccountResponse: HttpResponse = await this.restService.patch(Config.host.route + Routes.AUTH, body, headers);
    if (updateUserAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(updateUserAccountResponse.getBody().error);
    return new UserAccount(updateUserAccountResponse.getBody())
  }

  public async deleteUserAccount(accountId: string): Promise<void> {
    const headers = this.composeHeaders();
    const url = Config.host.route + Routes.AUTH + '/' + accountId
    const updateUserAccountResponse: HttpResponse = await this.restService.delete(url, {}, headers);
    if (updateUserAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(updateUserAccountResponse.getBody().error);
  }


  public async updateUserChatInfo(accountId: string, request: UpdateUserChatInfoRequest): Promise<UserAccount> {
    const headers = this.composeHeaders();
    const url = Config.host.route + Routes.AUTH + '/' + accountId + '/chat';
    const response: HttpResponse = await this.restService.put(url, request, headers);
    if (response.getStatus() !== HttpStatuses.STATUS_OK) {
      throw response.getBody();
    }
    return new UserAccount(response.getBody() as IUserAccount);
  }

  public accountFilled(): boolean {
    const account = this.storage.getUserAccount();
    if (!account) return false;
    const location = account.getInfo().getLocation() || null;
    const email = account.getInfo().getEmail() || null;
    const image = account.getInfo().getImage() || null;
    return !!image && !!location && !!email;
  }

  public async updatePlanGift(gift: Gift): Promise<UserAccount> {
    const headers = this.composeHeaders();
    const url = Config.host.route + Routes.AUTH + `/${this.storage.getUserAccount().getId()}/plan/gift`;
    const userAccountResponse: HttpResponse = await this.restService.put(url, toJS(gift), headers);
    const body = userAccountResponse.getBody() as IUserAccount;
    if (userAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) {
      throw body
    }
    return new UserAccount(body);
  }

  public async reportUser(reportRequest: ReportUserRequest): Promise<void> {
    try {
      const headers = this.composeHeaders();
      const url = Config.host.route + Routes.AUTH + '/block';
      const userAccountResponse: HttpResponse = await this.restService.post(url, reportRequest, headers);
      if (userAccountResponse.getStatus() !== HttpStatuses.STATUS_OK) {
        throw userAccountResponse.getBody()
      }
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  private composeHeaders(): Headers {
    const headers = new Headers();
    const accessToken = this.storage.getAuthUser() && this.storage.getAuthUser().getAccessToken() || '';
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('platform', Platform.OS.toLowerCase());
    headers.append('firebase_analytics_client_id', this.storage.getFirebaseStorage().getAnalytics().getClientId());
    headers.append('Content-Type', 'application/json');
    return headers;
  }




}
