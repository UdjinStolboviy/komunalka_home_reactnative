import { action, Lambda, observable } from "mobx";
import { NetInfoSubscription } from "@react-native-community/netinfo";

export class ListenerState {

  @observable private listenersOn: boolean;
  @observable private networkListener: NetInfoSubscription | null;
  @observable private planStateListener: Lambda | null;
  @observable private authStateListener: Lambda | null;
  @observable private fcmTokenRefreshListener: (() => void) | null;
  @observable private fcmPushReceivedListener: (() => void) | null;
  @observable private fcmPushOpenedListener: (() => void) | null;
  @observable private apnsPushListener: (() => void) | null;
  @observable private deepLinkListener: Function | null;


  constructor() {
    this.listenersOn = false;
    this.networkListener = null;
    this.planStateListener = null;
    this.authStateListener = null;
    this.fcmTokenRefreshListener = null;
    this.fcmPushReceivedListener = null;
    this.fcmPushOpenedListener = null;
    this.apnsPushListener = null;
    this.deepLinkListener = null;
  }

  public isListenersOn(): boolean {
    return this.listenersOn;
  }


  public getPlanStateListener(): Lambda | null {
    return this.planStateListener;
  }

  public getAuthStateListener(): Lambda | null {
    return this.authStateListener;
  }

  @action
  public setNetworkListener(value: NetInfoSubscription | null) {
    this.networkListener = value;
    this.planStateListener = null;
    this.authStateListener = null;
  }

  @action
  public setPlanStateListener(value: Lambda | null) {
    this.planStateListener = value;
  }

  @action
  public setAuthStateListener(value: Lambda | null) {
    this.authStateListener = value;
  }

  @action
  public enableListeners(): void {
    this.listenersOn = true;
  }

  @action
  public setFcmTokenRefreshListener(value: (() => void) | null) {
    this.fcmTokenRefreshListener = value;
  }

  @action
  public setFcmPushReceivedListener(value: (() => void) | null) {
    this.fcmPushReceivedListener = value;
  }

  @action
  public setFcmPushOpenedListener(value: (() => void) | null) {
    this.fcmPushOpenedListener = value;
  }

  @action
  public setApnsPushListener(value: (() => void) | null) {
    this.apnsPushListener = value;
  }


  public getDeepLinkListener(): Function | null {
    return this.deepLinkListener;
  }

  @action
  public setDeepLinkListener(value: Function | null) {
    this.deepLinkListener = value;
  }

  @action
  public disableListeners(): void {
    this.listenersOn = false;
    this.networkListener && this.networkListener();
    this.fcmTokenRefreshListener && this.fcmTokenRefreshListener();
    this.fcmPushReceivedListener && this.fcmPushReceivedListener();
    this.fcmPushOpenedListener && this.fcmPushOpenedListener();
    this.apnsPushListener && this.apnsPushListener();
    this.deepLinkListener && this.deepLinkListener();
  }
}
