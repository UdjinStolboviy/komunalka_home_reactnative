import { action, observable } from "mobx";

export interface IPhone {
  type: string;
  number: string;
}

export class Phone {

  @observable private type: string;
  @observable private number: string;

  constructor(phone: IPhone) {
    this.type = phone.type;
    this.number = phone.number;
  }

  public getNumber(): string {
    return this.number
  }

  @action
  public setNumber(number: string): void {
    this.number = number;
  }


}
