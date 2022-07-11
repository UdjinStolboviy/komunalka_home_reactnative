import { observable } from "mobx";

export interface IFlatImage {
  index: number;
  uri?: string
}

export class FlatImage {

  @observable
  private index: number;

  @observable
  private uri: string;


  constructor(flatImage: IFlatImage) {
    this.index = flatImage && flatImage.index;
    this.uri = flatImage && flatImage.uri as string;
  }

  public getIndex(): number {
    return this.index
  }

  public getUri(): string {
    return this.uri
  }

  public setUri(uri: string): void {
    this.uri = uri;
  }
}
