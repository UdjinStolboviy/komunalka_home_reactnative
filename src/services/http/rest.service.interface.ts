import { HttpResponse } from "../../models/http/http.response";

export interface IRESTService {
  get(url: string, headers: Headers): Promise<HttpResponse>
  post(url: string, body: any, headers: Headers, stringify?: boolean): Promise<HttpResponse>
  put(url: string, body: any, headers: Headers): Promise<HttpResponse>
  delete(url: string, body: any, headers: Headers): Promise<HttpResponse>
  patch(url: string, body: any, headers: Headers): Promise<HttpResponse>
}
