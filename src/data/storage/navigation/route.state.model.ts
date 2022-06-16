import { observable } from "mobx";

export class RouteState {

  @observable private readonly name: string;
  @observable private readonly params: any;

  constructor(name: string, params: any) {
    this.name = name;
    this.params = params;
  }

  public getName(): string {
    return this.name;
  }

  public getParams(): any {
    return this.params;
  }

}
