import { Plan } from "./plan.model";
import { action, observable } from "mobx";

export class PlanState {

  @observable
  private plan: Plan | null;

  constructor() {
    this.plan = null
  }

  public getPlan() {
    return this.plan;
  }

  @action
  public setPlan(plan: Plan) {
    this.plan = plan;
  }
}
