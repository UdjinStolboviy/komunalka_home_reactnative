import { observable } from "mobx";

export interface IPermission {
  title: string;
  extras: any;
}

export class Permission {

  @observable private title: string;
  @observable private extras: any;

  constructor(permission: IPermission) {
    this.title = permission.title;
    this.extras = permission.extras;
  }

}
