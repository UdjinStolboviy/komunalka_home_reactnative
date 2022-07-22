import { observable } from "mobx";

export interface ISlugs {
  name: string;
  domain: string;
  identification: string;
}

export class Slugs {
  @observable private name: string;
  @observable private domain: string;
  @observable private identification: string;


  constructor(slugs: ISlugs) {
    this.name = slugs.name;
    this.domain = slugs.domain;
    this.identification = slugs.identification
  }
}
