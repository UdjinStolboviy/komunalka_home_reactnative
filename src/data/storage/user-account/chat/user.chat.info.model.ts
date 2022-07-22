import { observable } from "mobx";

export interface IUserChatInfo {
  user_id: number;
}

export class UserChatInfo {

  @observable private user_id: number;

  constructor(chatInfo: IUserChatInfo) {
    this.user_id = chatInfo.user_id;
  }

  public getUser_id(): number {
    return this.user_id;
  }

  public setUser_id(value: number) {
    this.user_id = value;
  }
}
