import { AuthState } from "app/data/storage/auth/authStote.model";
import { injectable } from "inversify";
import { observable } from "mobx";
import { IAuthService } from "./auth.service.interface";


@injectable()
export class AuthService {

  @observable private AuthState: AuthState;

  constructor() {
    this.AuthState = new AuthState() as AuthState;
  }
  public getAuthState(): AuthState {
    return this.AuthState;
  }
}
