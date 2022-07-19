import { IRESTService } from "./rest.service.interface";
import { HttpResponse } from "../../models/http/http.response";
import { inject, injectable } from "inversify";


import { ILoggerService } from "../logger/main/logger.service.interface";
import { TYPES } from "app/data/ioc/types";
import { HttpStatuses } from "app/assets/constants/codes/HttpStatuses";


@injectable()
export class RESTService implements IRESTService {

  private readonly GET: string = 'GET';
  private readonly POST: string = 'POST';
  private readonly PUT: string = 'PUT';
  private readonly PATCH: string = 'PATCH';
  private readonly DELETE: string = 'DELETE';
  @inject(TYPES.Logger) private logger: ILoggerService;


  public async get(url: string, headers: Headers): Promise<HttpResponse> {
    const fetchOptions = { method: this.GET, headers: headers };
    this.logger.info('[GET Request]', {
      url: url,
      headers: headers,
    });
    try {
      let fetchResponse = await fetch(url, fetchOptions);
      const responseBody = await this.fetchBody(fetchResponse);
      const response = new HttpResponse(fetchResponse.status, responseBody, fetchResponse.headers);
      this.logger.info('[GET Response]', {
        url: url,
        body: responseBody
      });
      return response
    } catch (e) {
      this.logger.error('[GET Error]', e);
      return new HttpResponse(HttpStatuses.STATUS_INTERNAL_SERVER_ERROR, e, null);
    }
  }

  public async post(url: string, body: any, headers: Headers, stringify = true): Promise<HttpResponse> {
    this.logger.info('POST url --> ', url);
    this.logger.info('POST body --> ', body);
    try {
      const fetchOptions: RequestInit = { method: this.POST, headers: headers, body: stringify ? JSON.stringify(body) : body };
      let fetchResponse = await fetch(url, fetchOptions);
      const responseBody = await this.fetchBody(fetchResponse);
      const response = new HttpResponse(fetchResponse.status, responseBody, fetchResponse.headers);
      this.logger.info('POST response -->', response);
      return response;
    } catch (e) {
      this.logger.error('POST error --> ', e);
      return new HttpResponse(HttpStatuses.STATUS_INTERNAL_SERVER_ERROR, e, null);
    }
  }

  public async delete(url: string, body: any, headers: Headers, stringify = true): Promise<HttpResponse> {
    this.logger.info('DELETE url --> ', url);
    this.logger.info('DELETE body --> ', body);
    try {
      const fetchOptions: RequestInit = { method: this.DELETE, headers: headers, body: JSON.stringify(body) };
      let fetchResponse = await fetch(url, fetchOptions);
      const responseBody = await this.fetchBody(fetchResponse);
      const response = new HttpResponse(fetchResponse.status, responseBody, fetchResponse.headers);
      this.logger.info('DELETE response -->', response);
      return response;
    } catch (e) {
      this.logger.error('DELETE error --> ', e);
      return new HttpResponse(HttpStatuses.STATUS_INTERNAL_SERVER_ERROR, e, null);
    }
  }

  public async patch(url: string, body: any, headers: Headers): Promise<HttpResponse> {
    this.logger.info('PATCH url --> ', url);
    this.logger.info('PATCH body --> ', body);
    try {
      const fetchOptions: RequestInit = { method: this.PATCH, headers: headers, body: JSON.stringify(body) };
      let fetchResponse: Response = await fetch(url, fetchOptions);
      const responseBody = await this.fetchBody(fetchResponse);
      const response = new HttpResponse(fetchResponse.status, responseBody, fetchResponse.headers);
      this.logger.info('PATCH response -->', response);
      return response;
    } catch (e) {
      this.logger.error('PATCH error --> ', e);
      return new HttpResponse(HttpStatuses.STATUS_INTERNAL_SERVER_ERROR, e, null);
    }
  }

  public async put(url: string, body: any, headers: Headers): Promise<HttpResponse> {
    this.logger.info('PUT url --> ', url);
    this.logger.info('PUT body --> ', body);
    try {
      const fetchOptions: RequestInit = { method: this.PUT, headers: headers, body: JSON.stringify(body) };
      let fetchResponse = await fetch(url, fetchOptions);
      const responseBody = await this.fetchBody(fetchResponse);
      const response = new HttpResponse(fetchResponse.status, responseBody, fetchResponse.headers);
      this.logger.info('PUT response -->', response);
      return response;
    } catch (e) {
      this.logger.error('PUT error --> ', e);
      return new HttpResponse(HttpStatuses.STATUS_INTERNAL_SERVER_ERROR, e, null);
    }
  }

  private async fetchBody(fetchResponse: Response): Promise<any> {
    try {
      const response = await fetchResponse.json();
      return response;
    } catch (e) {
      return null
    }
  }


}
