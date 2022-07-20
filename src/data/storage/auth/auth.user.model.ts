import { observable } from "mobx";

export class AuthUser {

  private readonly DEFAULT_ID: number = 1;
  @observable private id: number;
  @observable private accessToken: string;
  @observable private loginType: string;

  constructor(accessToken: string, loginType: string) {
    this.id = this.DEFAULT_ID;
    this.accessToken = accessToken;
    this.loginType = loginType;
  }

  public getId(): number {
    return this.id
  }

  public getAccessToken(): string {
    return this.accessToken
  }

  public getLoginType(): string {
    return this.loginType
  }

}
