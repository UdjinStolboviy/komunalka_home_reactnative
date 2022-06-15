import { INotification, Notification } from "./notification.model";
import { Pagination } from "../pagination/pagination.model";
import { action, observable } from "mobx";

export interface INotificationsState {
  notifications: INotification[];
  badgeShown: boolean;
  checkBadge?: boolean;
}

export class NotificationsState extends Pagination {

  @observable private notifications: Notification[];
  @observable private unreadNotificationsCount: number;
  @observable private reloadNotifications: boolean;
  @observable private reloadNotificationsScreen: boolean;

  constructor(notificationState: INotificationsState) {
    super();
    super.setSize(15);
    super.setPage(1);
    this.notifications = notificationState && notificationState.notifications.map(item => new Notification(item));
    this.reloadNotifications = false;
    this.unreadNotificationsCount = 0;
    this.reloadNotificationsScreen = false;
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  @action
  public setNotifications(notifications: Notification[]): void {
    this.notifications = notifications;
  }


  public getUnreadNotificationsCount(): number {
    return this.unreadNotificationsCount;
  }

  @action
  public setUnreadNotificationsCount(value: number) {
    this.unreadNotificationsCount = value;
  }


  @action
  public forceReloadNotifications() {
    this.reloadNotifications = !this.reloadNotifications;
  }


  public getForceReloadNotifications(): boolean {
    return this.reloadNotifications;
  }


  public getReloadNotificationsScreen(): boolean {
    return this.reloadNotificationsScreen;
  }

  @action
  public setReloadNotificationsScreen(value: boolean) {
    this.reloadNotificationsScreen = value;
  }
}
