import { action, observable } from "mobx";

export interface INotification {
  _id: string;
  account_id: string;
  company_id: string;
  type: string,
  components: any;
  read_at: string;
  seen_at: string;
  archived_at: string;
  created_at: string;
}


export class Notification {

  @observable private _id: string;
  @observable private account_id: string;
  @observable private company_id: string;
  @observable private type: string;
  @observable private components: any;
  @observable private read_at: string;
  @observable private seen_at: string;
  @observable private archived_at: string;
  @observable private created_at: string;

  constructor(notification: INotification) {
    this._id = notification._id;
    this.account_id = notification.account_id;
    this.company_id = notification.company_id;
    this.type = notification.type;
    this.components = notification.components;
    this.read_at = notification.read_at;
    this.seen_at = notification.seen_at;
    this.archived_at = notification.archived_at;
    this.created_at = notification.created_at;
  }

  public getId(): string {
    return this._id;
  }

  @action
  public setReadAt(read_at: string): void {
    this.read_at = read_at;
  }

  public getReadAt(): string {
    return this.read_at;
  }

  public getSeenAt(): string {
    return this.seen_at;
  }

  public getCreatedAt(): string {
    return this.created_at;
  }

  public getType(): string {
    return this.type;
  }

  public getComponents(): any {
    return this.components;
  }


}
