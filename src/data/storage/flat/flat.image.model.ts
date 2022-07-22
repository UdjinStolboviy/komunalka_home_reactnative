import { observable } from "mobx";

export interface IFlatImage {
  index?: number;
  url?: string
}

export class FlatImage {

  @observable
  private index: number;

  @observable
  private url: string;


  constructor(flatImage: IFlatImage) {
    this.index = flatImage && flatImage.index;
    this.url = flatImage && flatImage.url as string;
  }

  public getIndex(): number {
    return this.index
  }

  public getUri(): string {
    return this.url;
  }

  public setUri(url: string): void {
    this.url = url;
  }
}
