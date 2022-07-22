import { action, observable } from "mobx";
import { BlockedEntities } from "./blocked.entities.model";

export class BlockedEntitiesState {

  @observable private blockedEntities: BlockedEntities | null;

  constructor() {
    this.blockedEntities = null;
  }


  public getBlockedEntities(): BlockedEntities | null {
    return this.blockedEntities;
  }

  @action
  public setBlockedEntities(value: BlockedEntities | null) {
    this.blockedEntities = value;
  }

}
