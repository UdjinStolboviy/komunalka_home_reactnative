import { IOnBoarding, OnBoarding } from "./onboarding.model";
import { observable } from "mobx";

export interface IIntroduction {
  show_tours: boolean;
  onboarding: IOnBoarding[];
}

export class Introduction {

  @observable private show_tours: boolean;
  @observable private onboarding: OnBoarding[];

  constructor(introduction: IIntroduction) {
    this.show_tours = introduction.show_tours;
    this.initOnBoarding(introduction.onboarding);
  }

  public getOnBoarding(): OnBoarding[] {
    return this.onboarding;
  }

  public getLast(): OnBoarding | null {
    if (this.onboarding.length === 0) return null;
    return this.onboarding[this.onboarding.length - 1];
  }

  private initOnBoarding(onboardings: IOnBoarding[]) {
    if (!onboardings || onboardings.length === 0) {
      this.onboarding = [];
    } else {
      this.onboarding = onboardings.map(item => new OnBoarding(item));
    }
  }



}
