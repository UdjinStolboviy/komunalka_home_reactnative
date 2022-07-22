import { action, observable } from "mobx";

export interface IGift {
  created_at_ms: number;
  created_at: string;
  notificationSeen: boolean;
  soonExpirationNotificationSeen: boolean;
}

export class Gift {

  @observable
  private readonly created_at_ms: number;

  @observable
  private readonly created_at: string;

  @observable
  private notificationSeen: boolean;

  @observable
  private soonExpirationNotificationSeen: boolean;

  constructor(gift: IGift) {
    this.created_at_ms = gift.created_at_ms;
    this.created_at = gift.created_at;
    this.notificationSeen = gift.notificationSeen;
    this.soonExpirationNotificationSeen = gift.soonExpirationNotificationSeen;
  }


  public getCreated_at_ms(): number {
    return this.created_at_ms;
  }

  public getCreated_at(): string {
    return this.created_at;
  }


  public getNotificationSeen(): boolean {
    return this.notificationSeen;
  }

  public getSoonExpirationNotificationSeen(): boolean {
    return this.soonExpirationNotificationSeen;
  }


  @action
  public setNotificationSeen(value: boolean) {
    this.notificationSeen = value;
  }

  @action
  public setSoonExpirationNotificationSeen(value: boolean) {
    this.soonExpirationNotificationSeen = value;
  }
}
