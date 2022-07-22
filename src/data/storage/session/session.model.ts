import { action, observable } from "mobx";
import { IViewAsCompany, ViewAsCompany } from "./view.as.company.model";

export interface ISession {
  view_as_company: IViewAsCompany;
}


export class Session {

  @observable private view_as_company: ViewAsCompany;


  constructor(session: ISession) {
    this.view_as_company = session.view_as_company && new ViewAsCompany(session.view_as_company);
  }

  public getViewAsCompany(): ViewAsCompany {
    return this.view_as_company;
  }

}
