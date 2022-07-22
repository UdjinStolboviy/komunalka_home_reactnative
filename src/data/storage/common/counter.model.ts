import { observable } from "mobx";

export interface ICounter {
  count: number;
  type: string;
  country: string;
  ip_address: string;
  last_logged_at: string;
  last_visited_at: string;
}

export class Counter {

  @observable private count: number;
  @observable private type: string;
  @observable private country: string;
  @observable private ip_address: string;
  @observable private last_logged_at: string;
  @observable private last_visited_at: string;

  constructor(counter: ICounter) {
    this.count = counter.count;
    this.type = counter.type;
    this.country = counter.country;
    this.ip_address = counter.ip_address;
    this.last_logged_at = counter.last_logged_at;
    this.last_visited_at = counter.last_visited_at;
  }

}
