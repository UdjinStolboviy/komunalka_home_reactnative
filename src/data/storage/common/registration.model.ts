import { observable } from "mobx";

export interface IRegistration {
  confirmed: boolean;
  calculator: boolean;
  token: string;
  referrer: string;
  marketo_cookie: string
}

export class Registration {

  @observable private confirmed: boolean;
  @observable private calculator: boolean;
  @observable private token: string;
  @observable private referrer: string;
  @observable private marketo_cookie: string;

  constructor(registration: IRegistration) {
    this.confirmed = registration.confirmed;
    this.calculator = registration.calculator;
    this.token = registration.token;
    this.referrer = registration.referrer;
    this.marketo_cookie = registration.marketo_cookie;
  }

  public getConfirmed(): boolean {
    return this.confirmed;
  }

  public getToken(): string {
    return this.token;
  }
}
