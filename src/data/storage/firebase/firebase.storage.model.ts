import { FirebaseAnalytics, IFirebaseAnalytics } from "./firebase.analytics.model";
import { action, observable } from "mobx";

export interface IFirebaseStorage {
  analytics: IFirebaseAnalytics
}


export class FirebaseStorage {

  @observable private analytics: FirebaseAnalytics;


  constructor(firebaseStorage: IFirebaseStorage) {
    this.analytics = firebaseStorage && new FirebaseAnalytics(firebaseStorage.analytics);
  }

  public getAnalytics() {
    return this.analytics;
  }

  @action
  public setAnalytics(analytics: FirebaseAnalytics) {
    this.analytics = analytics
  }
}
