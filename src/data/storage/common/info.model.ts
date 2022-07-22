import { action, observable } from "mobx";

export interface IInfo {
  name: string;
  email: string;
  image: string;
  location: string;
  about: string;
  labels: string[]
}

export class Info {

  @observable private name: string;
  @observable private email: string;
  @observable private image: string;
  @observable private location: string;
  @observable private about: string;
  @observable private labels: string[];

  constructor(info: IInfo) {
    this.name = info.name;
    this.email = info.email;
    this.image = info.image;
    this.location = info.location;
    this.about = info.about;
    this.labels = info.labels || [];
  }

  public getName(): string {
    return this.name
  }

  @action
  public setName(name: string): void {
    this.name = name;
  }

  public getImage(): string {
    return this.image
  }

  public getLocation(): string {
    return this.location
  }

  @action
  public setImage(image: string): void {
    this.image = image
  }

  public getEmail(): string {
    return this.email
  }

  @action
  public setEmail(email: string): void {
    this.email = email
  }

  @action
  public setLocation(location: string): void {
    this.location = location
  }

  public getAbout(): string {
    return this.about
  }

  @action
  public setAbout(about: string): void {
    this.about = about
  }


  public getLabels(): string[] {
    return this.labels;
  }

  @action
  public setLabels(value: string[]) {
    this.labels = value;
  }
}
