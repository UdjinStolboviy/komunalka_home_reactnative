import { action, observable } from "mobx";

export interface ILogin {
  type: string;
  count?: number;
  country?: string;
  ip_address?: string;
  last_logged_at?: string;
}

export class Login {

  @observable private type: string;
  @observable private count: number;
  @observable private country: string;
  @observable private ip_address: string;
  @observable private last_logged_at: string;

  constructor(login: ILogin) {
    this.type = login.type;
    this.count = login.count as number;
    this.country = login.country as string;
    this.ip_address = login.ip_address as string;
    this.last_logged_at = login.last_logged_at as string
  }

  public getType(): string {
    return this.type;
  }

  @action
  public setType(type: string): void {
    this.type = type;
  }
}
