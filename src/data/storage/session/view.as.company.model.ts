import { observable } from "mobx";

export interface IViewAsCompany {
  company_id: string;
}


export class ViewAsCompany {

  @observable private company_id: string;

  constructor(viewAsCompany: IViewAsCompany) {
    this.company_id = viewAsCompany.company_id;
  }

  public getCompanyId(): string {
    return this.company_id;
  }
}
