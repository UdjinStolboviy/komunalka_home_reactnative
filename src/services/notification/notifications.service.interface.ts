import { ICommonNotification } from "app/models/notification/common.notification.model";
import { INotificationCount } from "app/models/notification/notification.count.model";


export interface INotificationsService {
  searchNotifications(page: number, size: number): Promise<Notification[]>
  getNotificationsCount(): Promise<INotificationCount>
  markNotificationsAsSeen(): Promise<void>
  markNotificationAsRead(notificationId: string): Promise<void>
  assembleCommonNotification(notification: Notification): ICommonNotification;
  deleteNotification(notificationId: string): Promise<void>;
  refreshNotificationsCount(forceReloadNotifications?: boolean): Promise<void>;
  fetchNotifications(): Promise<void>;
}
