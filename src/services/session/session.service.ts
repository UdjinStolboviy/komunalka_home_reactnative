import { ISessionService } from "./session.service.interface";
import { inject, injectable } from "inversify";

import { IRESTService } from "../http/rest.service.interface";

import Config from "../../config/config";

import { HttpResponse } from "../../models/http/http.response";
import { TYPES } from "app/data/ioc/types";
import { GlobalStorage } from "app/data/storage/global.storage";
import { Session } from "app/data/storage/session/session.model";
import { Routes } from "app/assets/constants/codes/Routes";
import { HttpStatuses } from "app/assets/constants/codes/HttpStatuses";



@injectable()
export class SessionService implements ISessionService {

  @inject(TYPES.RESTService) restService!: IRESTService;
  @inject(TYPES.Storage) storage!: GlobalStorage;


  public async createCompanySession(companyId: string): Promise<Session> {
    const url: string = Config.host.route + Routes.AUTH + '/view-as-company';
    const headers: Headers = this.composeHeaders();
    headers.append("company_id", companyId);
    const createSessionResponse: HttpResponse = await this.restService.put(url, {}, headers);
    if (createSessionResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(createSessionResponse.getBody().error);
    const body: any = createSessionResponse.getBody();
    return new Session(body.session)
  }

  public async getCompanySession(): Promise<Session> {
    const url: string = Config.host.route + Routes.AUTH;
    const headers: Headers = this.composeHeaders();
    const companySessionResponse: HttpResponse = await this.restService.get(url, headers);
    if (companySessionResponse.getStatus() !== HttpStatuses.STATUS_OK) throw new Error(companySessionResponse.getBody().error);
    const body: any = companySessionResponse.getBody();
    return new Session(body.session)
  }

  private composeHeaders(): Headers {
    const headers = new Headers();
    const accessToken = this.storage.getAuthUser() && this.storage.getAuthUser().getAccessToken() || '';
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');
    return headers;
  }


}
