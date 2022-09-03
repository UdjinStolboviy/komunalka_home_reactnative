import { observable } from "mobx";

export class AuthUser {


  @observable private uid: string;
  @observable private displayName: string;
  @observable private email: string;
  @observable private photoURL: string;
  @observable private isAnonymous: boolean;

  constructor(uid: string, displayName: string, email: string, photoURL: string, isAnonymous: boolean) {
    this.uid = uid || "";
    this.displayName = displayName || "";
    this.email = email || "";
    this.photoURL = photoURL || "";
    this.isAnonymous = isAnonymous || false;
  }

  public getUid(): string {
    return this.uid
  }

  public getDisplayName(): string {
    return this.displayName
  }

  public getEmail(): string {
    return this.email
  }

  public getPhotoURL(): string {
    return this.photoURL
  }

  public getIsAnonymous(): boolean {
    return this.isAnonymous
  }

}
