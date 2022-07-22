import { observable } from "mobx";

export interface IEmail {
  email: string;
  office_id?: string;
}

export class Email {

  @observable private email: string;
  @observable private office_id: string;

  constructor(email: IEmail) {
    this.email = email.email;
    this.office_id = email.office_id as string;
  }

  public getEmail(): string {
    return this.email;
  }


}
