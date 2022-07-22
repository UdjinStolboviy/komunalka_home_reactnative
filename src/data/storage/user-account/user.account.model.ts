import { IInfo, Info } from "../common/info.model";

import { Authentication, IAuthentication } from "../common/authentication.model";
import { ISecurity, Security } from "../common/security.model";
import { IIntroduction, Introduction } from "../common/introduction.model";
import { IRegistration, Registration } from "../common/registration.model";

import { Counter, ICounter } from "../common/counter.model";
import { IInternal, Internal } from "../common/internal.model";
import { action, observable } from "mobx";
import { IModifiedBy, ModifiedBy } from "../common/modified.by.model";
import { AccountBasicInfo, IAccountBasicInfo } from "../common/account.basic.info";
import { ILogin, Login } from "../common/login.model";
import { Contact, IContact } from "../common/contact.model";



export interface IUserAccount {
  _id: string;
  info: IInfo;
  contacts: IContact;
  authentication: IAuthentication;
  security: ISecurity;
  introductions: IIntroduction;
  registration: IRegistration;
  login: ILogin;
  visits: ICounter;
  internal: IInternal;
  created_at: string;
  modified_at: string;
  modified_by: IModifiedBy;
  created_by: IAccountBasicInfo;

}

export class UserAccount {

  @observable private _id: string;
  @observable private info: Info;
  @observable private contacts: Contact;
  @observable private authentication: Authentication;
  @observable private security: Security;
  @observable private introductions: Introduction;
  @observable private registration: Registration;

  @observable private login: Login;
  @observable private visits: Counter;
  @observable private internal: Internal;
  @observable private created_at: string;
  @observable private modified_by: ModifiedBy;
  @observable private modified_at: string;
  @observable private created_by: AccountBasicInfo;


  constructor(userAccount: IUserAccount) {
    this._id = userAccount._id;
    this.info = userAccount.info && new Info(userAccount.info);
    this.contacts = userAccount.contacts && new Contact(userAccount.contacts);

    this.authentication = userAccount.authentication && new Authentication(userAccount.authentication);
    this.security = userAccount.security && new Security(userAccount.security);
    this.introductions = userAccount.introductions && new Introduction(userAccount.introductions);
    this.registration = userAccount.registration && new Registration(userAccount.registration);


    this.login = userAccount.login && new Login(userAccount.login);
    this.visits = userAccount.visits && new Counter(userAccount.visits);
    this.internal = userAccount.internal && new Internal(userAccount.internal);
    this.created_at = userAccount.created_at;
    this.modified_at = userAccount.modified_at;
    this.modified_by = userAccount.modified_by && new ModifiedBy(userAccount.modified_by);
    this.created_by = userAccount.created_by && new AccountBasicInfo(userAccount.created_by);

  }

  public getId(): string {
    return this._id;
  }

  public getInfo(): Info {
    return this.info
  }

  public getIntroductions(): Introduction {
    return this.introductions;
  }

  public getLogin(): Login {
    return this.login
  }

  public getRegistration(): Registration {
    return this.registration;
  }


  public getContact(): Contact {
    return this.contacts;
  }



  @action
  public setContact(contacts: Contact): void {
    this.contacts = contacts
  }



  @action
  setLogin(value: Login) {
    this.login = value;
  }




}
