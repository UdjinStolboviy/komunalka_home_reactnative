import { INotificationsService } from "./notifications.service.interface";
import { inject, injectable } from "inversify";




import { IRESTService } from "../http/rest.service.interface";
import Config from "../../config/config";

import { HttpResponse } from "../../models/http/http.response";



import { ImageSourcePropType } from "react-native";
import { INavigationService } from "../navigation/navigation.service.interface";


import moment from 'moment'


import { INotification } from "app/data/storage/notifications/notification.model";
import { TYPES } from "app/data/ioc/types";
import { GlobalStorage } from "app/data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { Routes } from "app/assets/constants/codes/Routes";
import { INotificationCount } from "app/models/notification/notification.count.model";
import { HttpStatuses } from "app/assets/constants/codes/HttpStatuses";
import { Errors } from "app/assets/constants/codes/Errors";
import { ICommonNotification } from "app/models/notification/common.notification.model";
import { appCoreService } from "app/data/ioc/inversify.config";



@injectable()
export class NotificationService implements INotificationsService {

  @inject(TYPES.Storage) private storage!: GlobalStorage;
  @inject(TYPES.Logger) private logger!: ILoggerService;
  @inject(TYPES.RESTService) private restService!: IRESTService;
  @inject(TYPES.NavigationService) private navigationService!: INavigationService;


  public async searchNotifications(page: number, size: number): Promise<Notification[]> {
    const url: string = Config.host.route + Routes.AUTH + `?page=${page}&size=${size}`;
    const headers: Headers = this.composeHeaders();
    const notificationsResponse: HttpResponse = await this.restService.get(url, headers);
    const notificationResponseBody = notificationsResponse.getBody();
    if (notificationsResponse.getStatus() !== HttpStatuses.STATUS_OK) return [];
    return notificationResponseBody.map((item: INotification) => new Notification(item));
  }

  public async getNotificationsCount(): Promise<INotificationCount> {
    const url: string = Config.host.route + Routes.AUTH + '/count';
    const headers: Headers = this.composeHeaders();
    const notificationsResponse: HttpResponse = await this.restService.get(url, headers);
    const notificationResponseBody = notificationsResponse.getBody();
    if (notificationsResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error('dfdfdfdffdd');
    return notificationResponseBody
  }

  public async markNotificationsAsSeen(): Promise<void> {
    const url: string = Config.host.route + Routes.AUTH;
    const headers: Headers = this.composeHeaders();
    const notificationsResponse: HttpResponse = await this.restService.put(url, {}, headers);
    const notificationResponseBody = notificationsResponse.getBody();
    if (notificationsResponse.getStatus() !== HttpStatuses.STATUS_OK &&
      notificationsResponse.getStatus() !== HttpStatuses.STATUS_NO_CONTENT) throw new Error(!!notificationResponseBody ? notificationResponseBody.error : null);
  }

  public async markNotificationAsRead(notificationId: string): Promise<void> {
    const url: string = Config.host.route + Routes.AUTH + `/${notificationId}/read`;
    const headers: Headers = this.composeHeaders();
    const notificationsResponse: HttpResponse = await this.restService.put(url, {}, headers);
    const notificationResponseBody = notificationsResponse.getBody();
    if (notificationsResponse.getStatus() !== HttpStatuses.STATUS_OK &&
      notificationsResponse.getStatus() !== HttpStatuses.STATUS_NO_CONTENT) throw new Error(!!notificationResponseBody ? notificationResponseBody.error : null);
  }

  public async deleteNotification(notificationId: string): Promise<void> {
    const url: string = Config.host.route + Routes.AUTH + `/${notificationId}`;
    const headers: Headers = this.composeHeaders();
    const notificationsResponse: HttpResponse = await this.restService.delete(url, {}, headers);
    const notificationResponseBody = notificationsResponse.getBody();
    if (notificationsResponse.getStatus() !== HttpStatuses.STATUS_OK) {
      throw notificationResponseBody;
    }
  }

  public assembleCommonNotification(notification: Notification): ICommonNotification {

    const assembler: any = {
      'new-matches': NotificationService.prototype.assembleOpportunityNewMatches,

    };
    return assembler && assembler(notification);
  }

  public async refreshNotificationsCount(forceReloadNotifications?: boolean): Promise<void> {
    try {
      const notificationState = this.storage.getNotificationsState();
      const notificationsCount = await this.getNotificationsCount();


      notificationState.setUnreadNotificationsCount(notificationsCount.unread)

      if (forceReloadNotifications) {
        notificationState.setPage(1);
        notificationState.forceReloadNotifications();
      }
    } catch (e) {
      this.logger.error(e.message || e.error);
    }
  }


  public async fetchNotifications(): Promise<void> {
    try {
      const notifications: Notification[] = await appCoreService.notificationsService.searchNotifications(1, 15);
      await this.refreshNotificationsCount(false);
      if (notifications.length > 0) {
        //this.storage.getNotificationsState().setNotifications(notifications);
        this.storage.getNotificationsState().setPage(1);
      }
    } catch (e) {
      this.logger.warning(e.message || e.error)
    }
  };

  private assembleFreeSubscription(notification: Notification) {
    const title = 'Free subscription';
    const text = 'You have a free subscription';
    const image: ImageSourcePropType = 1;
    const date: string = moment(new Date()).format('ddd, MMM D YYYY, h:mm:ss A');
    return {
      title: title,
      text: text,
      date: date,
      image: image,
      data: {
        company: 'wewewe',
      }
    }
  }


  private assembleOpportunityNewMatches(notification: Notification): ICommonNotification {

    return {
      title: 'New matches',
      text: 'sdd',
      date: 'asda',
      imageReplacer: undefined,
      data: {
        company: 'wewewe',
      }
    }
  }




  private composeHeaders(): Headers {
    const headers = new Headers();

    const accessToken = this.storage.getAuthUser() && this.storage.getAuthUser().getAccessToken() || '';
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');

    return headers;



  }
}
