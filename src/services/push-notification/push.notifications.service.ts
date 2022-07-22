import { IPushNotificationService } from "./push.notification.service.interface";
import { inject, injectable } from "inversify";
import { Platform } from "react-native";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

import { IUserAccountService } from "../user-account/user.account.service.interface";
import { IDeepLinkService } from "../deep-link/deep.link.service.interface";
import { INotificationsService } from "../notification/notifications.service.interface";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { ReceivedNotification } from "react-native-push-notification";

import { INavigationService } from "../navigation/navigation.service.interface";

import { Errors } from "app/assets/constants/codes/Errors";
import { TYPES } from "app/data/ioc/types";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { GlobalStorage } from "app/data/storage/global.storage";
import { Screens } from "app/assets/constants/codes/Screens";
import { PushNotificationCategories } from "../utils/push.notification.categories";


@injectable()
export class PushNotificationsService implements IPushNotificationService {

  @inject(TYPES.Logger) private logger!: ILoggerService;
  @inject(TYPES.Storage) private storage!: GlobalStorage;
  @inject(TYPES.UserAccountService) private userAccountService!: IUserAccountService;
  @inject(TYPES.DeepLinkService) private deepLinkService!: IDeepLinkService;
  @inject(TYPES.NotificationsService) private notificationsService!: INotificationsService;
  @inject(TYPES.NavigationService) private navigationService!: INavigationService;

  constructor() {
    PushNotification.configure({
      onNotification: this._onApnsPush.bind(this),
    });
  }

  public async checkPermissions(): Promise<boolean> {
    try {
      const hasPermissions = await messaging().hasPermission();
      return hasPermissions === messaging.AuthorizationStatus.AUTHORIZED ||
        hasPermissions === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (e: any) {
      this.logger.error(Errors.CHECK_PUSH_PERMISSION_ERROR, e.message || e.error);
      throw e;
    }
  }

  public onFcmRefresh() {
    const unsubscribe = messaging().onTokenRefresh(this.onFcmTokenRefresh.bind(this));
    this.storage.getListenerState().setFcmTokenRefreshListener(unsubscribe);
  }

  public async updatePushTokens(): Promise<void> {
    try {
      const fcm = await messaging().getToken();
      // await this.customerIOService.updateCustomerIODevice(fcm);
    } catch (e: any) {
      this.logger.error(e);
    }
  }


  public async requestPermissions(): Promise<boolean> {
    try {
      const authStatus = Platform.OS === 'ios' ? await messaging().requestPermission() : messaging().hasPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    } catch (e: any) {
      this.logger.error(Errors.REQUEST_PUSH_PERMISSION_ERROR, e.message || e.error);
      throw e;
    }
  }


  public listenToFcmPushOpened(): void {
    const unsubscribe = messaging().onNotificationOpenedApp(this._onFcmPushOpened.bind(this));
    this.storage.getListenerState().setFcmPushOpenedListener(unsubscribe);
  }

  public listenToFcmPushReceived(): void {
    const unsubscribe = messaging().onMessage(this._onFcmPushReceived.bind(this));
    this.storage.getListenerState().setFcmPushReceivedListener(unsubscribe);

  }

  public listenToFcmPushReceivedInBackground(): void {
    messaging().setBackgroundMessageHandler(this._onFcmPushReceived.bind(this))
  }

  public listenToApnsPush(): void {
    const unsubscribe: () => void = () => PushNotificationIOS.removeEventListener('notification');
    this.storage.getListenerState().setApnsPushListener(unsubscribe);
  }

  public openAppWithApns(): void {
    PushNotification.popInitialNotification(async notification => {
      await this.onApnsPushOpened(notification as any)
    })
  }

  public openAppWithFcm(): void {
    messaging()
      .getInitialNotification()
      .then(async notification => {
        await this._onFcmPushOpened(notification!)
      })
  }


  private async _onApnsPush(notification: Omit<ReceivedNotification, 'userInfo'>) {
    const opened = notification.userInteraction;
    if (opened) {
      await this.onApnsPushOpened(notification)
    } else {
      // await this.chatService.refreshUnreadMessagesCount();
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }

  private async onFcmTokenRefresh(fcm: string) {
    // await this.customerIOService.updateCustomerIODevice(fcm);
    if (Platform.OS === 'android') {
      // await this.chatService.subscribeToPushNotification(fcm)
    }
  }

  private async onApnsPushOpened(notification: Omit<ReceivedNotification, 'userInfo'>) {

    const category = notification.data.aps.category
    const custom_data = notification.data.custom_data;
    if (category === PushNotificationCategories.CHAT_MESSAGE.toString()) {
      // await this.chatService.openChatDialogFromPush(custom_data.user_id as string, custom_data.chat_sender_id);
      return;
    }
    if (category === PushNotificationCategories.SYSTEM_CHAT_MESSAGE.toString()) {
      //await this.chatService.openSystemDialogFromPush(parseInt(custom_data.chat_sender_id));
      return;
    }
    this.navigationService.navigate(Screens._NOTIFICATION_SETTING);

  }

  private async _onFcmPushReceived(push: FirebaseMessagingTypes.RemoteMessage) {
    // await this.chatService.refreshUnreadMessagesCount();
  }

  private async _onFcmPushOpened(push: FirebaseMessagingTypes.RemoteMessage) {
    let custom_data: any = push.data && push.data.custom_data || null;
    if (!custom_data) return;
    custom_data = JSON.parse(custom_data)
    const category: string = custom_data.category;
    if (category === PushNotificationCategories.CHAT_MESSAGE.toString()) {
      // await this.chatService.openChatDialogFromPush(custom_data.user_id as string, custom_data.chat_sender_id);
      return;
    }
    if (category === PushNotificationCategories.SYSTEM_CHAT_MESSAGE.toString()) {
      // await this.chatService.openSystemDialogFromPush(parseInt(custom_data.chat_sender_id));
      return;
    }
    this.navigationService.navigate(Screens._NOTIFICATION_SETTING);
  }


}
