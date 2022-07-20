import { observable } from "mobx";

export interface ILocalAuthentication {
  username: string;
  password: string;
}


export class LocalAuthentication {

  @observable private username: string;
  @observable private password: string;

  constructor(localAuthentication: ILocalAuthentication) {
    this.username = localAuthentication.username;
    this.password = localAuthentication.password;
  }
}
