import { observable } from "mobx";
import { CreateOpportunityPulseAnimationState } from "./create.opportunity.pulse.animation.state";

export class AnimationsState {

  @observable private readonly createOpportunityPulseAnimationState: CreateOpportunityPulseAnimationState;

  constructor() {
    this.createOpportunityPulseAnimationState = new CreateOpportunityPulseAnimationState();
  }

  public getCreateOpportunityPulseAnimationState() {
    return this.createOpportunityPulseAnimationState;
  }



}
