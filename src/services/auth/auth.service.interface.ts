import { IRegistration } from "../../models/auth/registration.model";
import { IOtpValid } from "../../models/auth/otp.valid.model";

import { IAccessToken } from "../../models/auth/access.token";
import { AuthUser } from "app/data/storage/auth/auth.user.model";

export interface IAuthService {
  register(registrationRequest: IRegistration): Promise<void>
  login(email: string): Promise<any>
  logout(): Promise<void>;
  deleteAccount(): Promise<void>;
}
