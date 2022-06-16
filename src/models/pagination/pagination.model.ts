import { action, observable } from "mobx";

export class Pagination {

  @observable private size: number;
  @observable private page: number;
  @observable private loadingMore: boolean;
  @observable private loading: boolean;
  @observable private refreshing: boolean;
  @observable private refreshState: boolean;

  constructor() {
    this.size = 5;
    this.page = 0;
    this.loading = false;
    this.loadingMore = false;
    this.refreshing = false;
    this.refreshState = false;
  }

  public getSize(): number {
    return this.size;
  }

  @action
  public setSize(size: number): void {
    this.size = size;
  }

  public getPage(): number {
    return this.page;
  }

  @action
  public setPage(page: number): void {
    this.page = page;
  }

  public getLoadingMore(): boolean {
    return this.loadingMore;
  }

  @action
  public setLoadingMore(loadingMore: boolean): void {
    this.loadingMore = loadingMore;
  }


  public getLoading(): boolean {
    return this.loading;
  }

  @action
  public setLoading(value: boolean) {
    this.loading = value;
  }


  public getRefreshing(): boolean {
    return this.refreshing;
  }

  @action
  public setRefreshing(value: boolean) {
    this.refreshing = value;
  }

  @action
  public getRefreshState(): boolean {
    return this.refreshState;
  }

  @action
  public updateRefreshState(): void {
    this.refreshState = !this.refreshState;
  }
}
