import { observable } from "mobx";

export interface IOnBoarding {
  name: string;
  response: any;
  created_at: string;
}

export class OnBoarding {

  @observable private name: string;
  @observable private response: any;
  @observable private created_at: string;

  constructor(onboarding: IOnBoarding) {
    this.name = onboarding.name;
    this.response = onboarding.response;
    this.created_at = onboarding.created_at;
  }

  public getName(): string {
    return this.name;
  }
}
