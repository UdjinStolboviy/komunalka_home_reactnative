import { observable } from "mobx";

export interface ISale {
  code: string;
  commission_code: string;
  referral_code: string;
  partner_code: string;
}

export class Sale {

  @observable private code: string;
  @observable private commission_code: string;
  @observable private referral_code: string;
  @observable private partner_code: string;

  constructor(sale: ISale) {
    this.code = sale.code;
    this.commission_code = sale.commission_code;
    this.referral_code = sale.referral_code;
    this.partner_code = sale.partner_code;
  }

}
