import { IPhone, Phone } from "./phone.model";
import { Email, IEmail } from "./email.model";
import { action, observable } from "mobx";

export interface IContacts {
  phones: IPhone[];
  emails: IEmail[];
}

export class Contacts {

  @observable private phones: Phone[];
  @observable private emails: Email[];


  constructor(contacts: IContacts) {
    this.initEmails(contacts.emails);
    this.initPhones(contacts.phones);
  }

  public getEmails() {
    return this.emails;
  }

  @action
  public addEmail(email: Email) {
    const updatedEmails = [...this.emails];
    updatedEmails.push(email);
    this.emails = updatedEmails;
  }

  @action
  public setEmails(emails: Email[]) {
    this.emails = emails;
  }

  public getPhones() {
    return this.phones;
  }

  @action
  public addPhone(phone: Phone) {
    const updatedPhones = [...this.phones];
    updatedPhones.push(phone);
    this.phones = updatedPhones;
  }

  @action
  public setPhones(phones: Phone[]) {
    this.phones = phones;
  }





  private initPhones(phones: IPhone[]) {
    if (!phones || phones.length === 0) {
      this.phones = [];
    } else {
      this.phones = phones.map(item => new Phone(item));
    }
  }

  private initEmails(emails: IEmail[]) {
    if (!emails || emails.length === 0) {
      this.emails = [];
    } else {
      this.emails = emails.map(item => new Email(item));
    }
  }

}
