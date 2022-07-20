import { observable } from "mobx";

export interface IAccountBasicInfo {
  account_id: string;
  name: string;
  image: string;
  location: string;
  about: string;
}

export class AccountBasicInfo {

  @observable private account_id: string;
  @observable private name: string;
  @observable private image: string;
  @observable private location: string;
  @observable private about: string;

  constructor(accountBasicInfo: IAccountBasicInfo) {
    this.account_id = accountBasicInfo.account_id;
    this.name = accountBasicInfo.name;
    this.image = accountBasicInfo.image;
    this.location = accountBasicInfo && accountBasicInfo.location;
    this.about = accountBasicInfo && accountBasicInfo.about;
  }

  public getAccountId(): string {
    return this.account_id;
  }

  public getImage(): string {
    return this.image;
  }

  public getName(): string {
    return this.name;
  }

  public getLocation(): string {
    return this.location;
  }

  public getAbout(): string {
    return this.about;
  }
}
