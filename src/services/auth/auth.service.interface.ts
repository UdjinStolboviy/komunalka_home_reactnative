import { IRegistration } from "../../models/auth/registration.model";

export interface IAuthService {
  register(registrationRequest: IRegistration): Promise<void>
  login(email: string): Promise<any>
  logout(): Promise<void>;
  deleteAccount(): Promise<void>;
}
