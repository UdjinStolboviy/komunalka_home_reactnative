import { AccountBasicInfo, IAccountBasicInfo } from "./account.basic.info";

import { observable } from "mobx";

export interface IModifiedBy {
  account: IAccountBasicInfo;

}

export class ModifiedBy {

  @observable private account: AccountBasicInfo;


  constructor(modifiedBy: IModifiedBy) {
    this.account = modifiedBy.account && new AccountBasicInfo(modifiedBy.account);

  }
}
