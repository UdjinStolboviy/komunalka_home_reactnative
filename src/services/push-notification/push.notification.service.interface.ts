
export interface IPushNotificationService {
  requestPermissions(): Promise<boolean>
  checkPermissions(): Promise<boolean>
  listenToFcmPushReceived(): void;
  listenToFcmPushOpened(): void;
  listenToFcmPushReceivedInBackground(): void;
  listenToApnsPush(): void;
  updatePushTokens(): Promise<void>;
  onFcmRefresh(): void;
  openAppWithApns(): void;
  openAppWithFcm(): void;
}
