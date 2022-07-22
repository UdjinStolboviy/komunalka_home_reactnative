import { inject, injectable } from "inversify";
import { IDBService } from "./db.service.interface";
import SQLite, { DatabaseParams, ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';

import { IAppleUser } from "../../models/auth/apple.user";
import { TYPES } from "app/data/ioc/types";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { GlobalStorage } from "app/data/storage/global.storage";
import { AuthUser } from "app/data/storage/auth/auth.user.model";


@injectable()
export class DBService implements IDBService {

  @inject(TYPES.Logger) logger!: ILoggerService;
  @inject(TYPES.Storage) storage!: GlobalStorage;
  private dbClient!: SQLiteDatabase;
  private readonly DB_NAME: string = 'PowerlinxDB.db';

  public async openConnection(): Promise<void> {
    SQLite.enablePromise(true);
    const dbOptions: DatabaseParams = {
      name: this.DB_NAME,
      location: 'Documents'
    };
    const db = await SQLite.openDatabase(dbOptions);
    this.dbClient = db;
  }


  public async closeConnection(): Promise<void> {
    await this.dbClient.close();
  }

  public async initTables(): Promise<void> {
    await this.createAuthUsersTableIfNotExists();
    await this.createAppleUsersTableIfNotExists();
  }

  public async getAuthUser(): Promise<AuthUser> {
    const query: string = 'SELECT id, access_token, login_type FROM auth_users';
    const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
    const response = dbResponse[0];
    if (!response) throw new Error('Auth user not found');
    const authUserDBResponse = response.rows.item(0);
    return new AuthUser(authUserDBResponse.access_token, authUserDBResponse.login_type);
  }

  public async addAuthUser(authUser: AuthUser): Promise<void> {
    try {
      const existingUser: AuthUser = await this.getAuthUser();
      if (existingUser) await this.deleteAuthUser(existingUser);
    } catch (e) {
      this.logger.info('no existing auth user');
    }
    const query: string = 'INSERT INTO auth_users (id, access_token, login_type) VALUES (?,?,?)';
    const response = await this.dbClient.executeSql(query, [authUser.getId(), authUser.getAccessToken(), authUser.getLoginType()]);
  }

  public async addAppleUser(appleUser: IAppleUser): Promise<void> {
    try {
      const existingAppleUser: IAppleUser = await this.getAppleUser();
      if (existingAppleUser) await this.deleteAppleUser(appleUser);
    } catch (e) {
      this.logger.error("Add Apple User Error -> ", e)
    }
    const query: string = 'INSERT INTO apple_users (id, id_token, first_name, last_name) VALUES (?,?,?,?)';
    const response = await this.dbClient.executeSql(query, [appleUser.id, appleUser.idToken, appleUser.firstName, appleUser.lastName]);
  }

  public async getAppleUser(): Promise<IAppleUser> {
    const query: string = 'SELECT id, id_token, first_name, last_name FROM apple_users';
    const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
    const response = dbResponse[0];
    if (!response) throw new Error('Apple user not found');
    const appleUserDBResponse = response.rows.item(0);
    return {
      id: appleUserDBResponse.id,
      idToken: appleUserDBResponse.id_token,
      firstName: appleUserDBResponse.first_name,
      lastName: appleUserDBResponse.last_name
    }
  }

  public async deleteAuthUser(authUser: AuthUser): Promise<void> {
    if (!authUser) return;
    const query: string = 'DELETE FROM auth_users WHERE id =?';
    const response = await this.dbClient.executeSql(query, [authUser.getId()]);
  }

  public async deleteAppleUser(appleUser: IAppleUser): Promise<void> {
    if (!appleUser) return;
    const query: string = 'DELETE FROM apple_users WHERE id =?';
    const response = await this.dbClient.executeSql(query, [appleUser.id]);
  }

  public async purchaseTableExists(): Promise<boolean> {
    try {
      const query = "SELECT name FROM sqlite_master WHERE type='table' AND name='purchases'";
      const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
      return dbResponse[0].rows.length === 1;
    } catch (e) {
      this.logger.error("Table exists query error: ", e);
      throw e;
    }
  }

  public async deletePurchasesTable(): Promise<void> {
    try {
      const query = 'DROP TABLE IF EXISTS purchases';
      await this.dbClient.executeSql(query)
    } catch (e) {
      this.logger.error("Delete purchases query error: ", e);
      throw e;
    }
  }


  private async createAuthUsersTableIfNotExists(): Promise<void> {
    try {
      const query = 'CREATE TABLE IF NOT EXISTS auth_users (id INTEGER PRIMARY KEY NOT NULL , access_token TEXT, login_type TEXT)';
      const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
      this.logger.info('Auth Users creation table response -> ', dbResponse);
    } catch (e) {
      this.logger.error("Auth Users creation table error -> ", e)
    }
  }

  private async createAppleUsersTableIfNotExists(): Promise<void> {
    try {
      const query = 'CREATE TABLE IF NOT EXISTS apple_users (id INTEGER PRIMARY KEY NOT NULL , id_token TEXT, first_name TEXT, last_name TEXT)';
      const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
      this.logger.info('Apple Users creation table response -> ', dbResponse);
    } catch (e) {
      this.logger.error("Apple Users creation table error -> ", e)
    }
  }

  public async addPurchases(purchases: string[]): Promise<void> {
    try {
      await this.createPurchasesTable();
      await Promise.all(purchases.map(transactionId => this.insertTransactionId(transactionId)));
    } catch (e) {
      this.logger.error('Add purchases error:', e);
    }
  }

  public async getPurchases(): Promise<string[]> {
    try {
      const query: string = 'SELECT transaction_id FROM purchases';
      const dbResponse: ResultSet[] = await this.dbClient.executeSql(query);
      const response = dbResponse[0];
      const itemsCount = response.rows.length;
      const transactionIds = [];
      for (let i = 0; i < itemsCount; i++) {
        transactionIds.push(response.rows.item(i).transaction_id);
      }
      return transactionIds;
    } catch (e) {
      this.logger.error('Get purchases error:', e);
      throw e;
    }
  }

  private async insertTransactionId(transactionId: string) {
    try {
      const query: string = 'INSERT INTO purchases (transaction_id) VALUES (?)';
      await this.dbClient.executeSql(query, [transactionId]);
    } catch (e) {
      this.logger.error('Insert transactionId error', e);
      throw e;
    }
  };

  private async createPurchasesTable(): Promise<void> {
    try {
      const query = 'CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY NOT NULL , transaction_id TEXT)';
      await this.dbClient.executeSql(query);
      this.logger.info('Purchases table created');
    } catch (e) {
      this.logger.error('Purchase table creation error', e);
      throw e;
    }

  }






}
