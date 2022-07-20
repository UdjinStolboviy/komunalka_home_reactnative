import { observable } from "mobx";
import { IPhone, Phone } from "./phone.model";
import { Email, IEmail } from "./email.model";

export interface IContact {
  email?: IEmail;
  phone: IPhone
}

export class Contact {

  @observable private email: Email | undefined;
  @observable private phone: Phone;

  constructor(contact: IContact) {
    if (contact.email) this.email = new Email(contact.email);
    this.phone = contact.phone && new Phone(contact.phone)
  }

  public getPhone(): Phone {
    return this.phone;
  }


}
