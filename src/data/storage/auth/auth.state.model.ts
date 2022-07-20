import { action, observable } from "mobx";

export class AuthState {

  @observable
  private loggedIn?: boolean;

  constructor() {
    this.loggedIn = false;
  }


  getLoggedIn(): boolean | undefined {
    return this.loggedIn;
  }

  @action
  public setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
}
