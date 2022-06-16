import { action, observable } from "mobx";

export class CreateOpportunityPulseAnimationState {

  @observable private animationAlreadyPlayed: boolean;
  @observable private playAnimation: boolean;

  constructor() {
    this.animationAlreadyPlayed = false;
    this.playAnimation = false;
  }

  public getAnimationAlreadyPlayed(): boolean {
    return this.animationAlreadyPlayed;
  }

  @action
  public setAnimationAlreadyPlayed(animationAlreadyPlayed: boolean): void {
    this.animationAlreadyPlayed = animationAlreadyPlayed;
  }

  public getPlayAnimation(): boolean {
    return this.playAnimation;
  }

  @action
  public setPlayAnimation(playAnimation: boolean): void {
    this.playAnimation = playAnimation;
  }
}
