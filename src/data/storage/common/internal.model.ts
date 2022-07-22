import { observable } from "mobx";
import { AccountBasicInfo, IAccountBasicInfo } from "./account.basic.info";
import { ISlugs, Slugs } from "./slugs.model";
import { ISales, Sales } from "./sales.model";

export interface IInternal {
  relationship_manager: IAccountBasicInfo;
  slugs: ISlugs;
  no_corporate_email: boolean;
  sales: ISales;
}

export class Internal {

  @observable private relationship_manager: AccountBasicInfo;
  @observable private slugs: Slugs;
  @observable private sales: Sales;
  @observable private no_corporate_email: boolean;

  constructor(internal: IInternal) {
    this.relationship_manager = internal.relationship_manager && new AccountBasicInfo(internal.relationship_manager);
    this.slugs = internal.slugs && new Slugs(internal.slugs);
    this.sales = internal.sales && new Sales(internal.sales);
    this.no_corporate_email = internal.no_corporate_email;
  }
}
