
import { AuthUser } from "app/data/storage/auth/auth.user.model";
import { IAppleUser } from "../../models/auth/apple.user";

export interface IDBService {
  openConnection(): Promise<void>;

  closeConnection(): Promise<void>;

  initTables(): Promise<void>

  addAuthUser(authUser: AuthUser): Promise<void>

  getAuthUser(): Promise<AuthUser>

  deleteAuthUser(authUser: AuthUser): Promise<void>

  deleteAppleUser(appleUser: IAppleUser): Promise<void>

  addAppleUser(appleUser: IAppleUser): Promise<void>

  getAppleUser(): Promise<IAppleUser>

  addPurchases(purchases: string[]): Promise<void>

  getPurchases(): Promise<string[]>

  purchaseTableExists(): Promise<boolean>

  deletePurchasesTable(): Promise<void>;

}
