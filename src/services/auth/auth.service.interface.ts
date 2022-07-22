import { IRegistration } from "../../models/auth/registration.model";
import { IOtpValid } from "../../models/auth/otp.valid.model";

import { IAccessToken } from "../../models/auth/access.token";
import { AuthUser } from "app/data/storage/auth/auth.user.model";

export interface IAuthService {
  socialAuth(idToken: string, type: string): Promise<void>
  getAccessTokenByEmail(email: string): Promise<IAccessToken>
  register(registrationRequest: IRegistration): Promise<void>
  login(email: string): Promise<AuthUser>
  sendOTP(): Promise<void>
  confirmOTP(otp: string): Promise<IOtpValid>
  confirmRegistration(token: string): Promise<void>
  autoLogin(): Promise<void>;
  logout(): Promise<void>;
  deleteAccount(): Promise<void>;
}
