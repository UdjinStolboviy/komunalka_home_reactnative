export class HttpResponse {

  private status: number;
  private body: any;
  private headers: any;

  constructor(status: number, body: any, headers: any) {
    this.status = status;
    this.body = body;
    this.headers = headers;
  }

  public getStatus(): number {
    return this.status;
  }

  public getBody(): any {
    return this.body;
  }

  public getHeaders(): any {
    return this.headers;
  }
}
