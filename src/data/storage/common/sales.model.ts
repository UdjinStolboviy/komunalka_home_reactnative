import { observable } from "mobx";

export interface ISales {
  volume: string;
  currency: string;
  export_percentage: string;
}

export class Sales {
  @observable private volume: string;
  @observable private currency: string;
  @observable private export_percentage: string;

  constructor(sales: ISales) {
    this.volume = sales.volume;
    this.currency = sales.currency;
    this.export_percentage = sales.export_percentage;
  }
}
