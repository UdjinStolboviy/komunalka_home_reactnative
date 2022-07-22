import { action, observable } from "mobx";

export interface IFirebaseAnalytics {
  clientId: string;
}

export class FirebaseAnalytics {

  @observable private clientId: string;


  constructor(firebaseAnalytics: IFirebaseAnalytics) {
    this.clientId = firebaseAnalytics && firebaseAnalytics.clientId;
  }

  public getClientId(): string {
    return this.clientId;
  }

  @action
  public setClientId(clientId: string): void {
    this.clientId = clientId;
  }
}
