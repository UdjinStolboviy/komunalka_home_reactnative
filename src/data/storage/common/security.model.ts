import { observable } from "mobx";
import { IPermission, Permission } from "./permission.model";

export interface ISecurity {
  permissions: IPermission[];
  role: string;
}

export class Security {

  @observable private permissions: Permission[];
  @observable private role: string;

  constructor(security: ISecurity) {
    this.initPermissions(security.permissions);
    this.role = security.role;
  }

  private initPermissions(permissions: IPermission[]) {
    if (!permissions || permissions.length === 0) {
      this.permissions = []
    } else {
      this.permissions = permissions.map(item => new Permission(item));
    }
  }
}
