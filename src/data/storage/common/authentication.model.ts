import { ILocalAuthentication, LocalAuthentication } from "./local.authentication.model";
import { observable } from "mobx";

export interface IAuthentication {
  google_id: string;
  linkedin_id: string;
  facebook_id: string;
  local: ILocalAuthentication;
}

export class Authentication  {

  @observable private google_id: string;
  @observable private linkedin_id: string;
  @observable private facebook_id: string;
  @observable private local: LocalAuthentication;

  constructor(authentication: IAuthentication) {
    this.google_id = authentication.google_id;
    this.linkedin_id = authentication.linkedin_id;
    this.facebook_id = authentication.facebook_id;
    this.local = authentication.local && new LocalAuthentication(authentication.local);
  }
}
