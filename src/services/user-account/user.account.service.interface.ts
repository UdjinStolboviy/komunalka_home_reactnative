
import { IUpdateUserAccount } from "../../models/user-account/update.user.account.model";

import { ReportUserRequest } from "../../models/user-account/report.user.request";
import { UpdateUserChatInfoRequest } from "../../models/user-account/update.user.chat.info.request";
import { IUserAccount, UserAccount } from "app/data/storage/user-account/user.account.model";
import { Gift } from "app/data/storage/user-account/plan/gift.model";

export interface IUserAccountService {
  getUserAccount(): Promise<IUserAccount>
  getUserAccountByEmail(email: string): Promise<UserAccount | null>
  getUserAccountById(id: string): Promise<UserAccount>
  updateUserAccountLogin(loginType: string): Promise<void>
  updateUserAccount(updateUserAccountRequest: IUpdateUserAccount): Promise<UserAccount>;
  accountFilled(): boolean;
  updatePlanGift(gift: Gift): Promise<UserAccount>;
  reportUser(reportRequest: ReportUserRequest): Promise<void>;
  setUpBlockedEntities(): Promise<void>;
  updateUserChatInfo(accountId: string, request: UpdateUserChatInfoRequest): Promise<UserAccount>;
  deleteUserAccount(accountId: string): Promise<void>;
}
