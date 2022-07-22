import { Session } from "../../storage/session/session.model";

export interface ISessionService {
  createCompanySession(companyId: string): Promise<Session>
  getCompanySession(): Promise<Session>
}
