import { observable } from "mobx";

export interface IBlockedEntities {
  blocked_by: string;
  opportunities: string[];
  users: string[];
  companies: string[];
}

export class BlockedEntities {

  @observable private blocked_by: string;
  @observable private opportunities: string[];
  @observable private users: string[];
  @observable private companies: string[];


  constructor(blockedEntities: IBlockedEntities) {
    this.blocked_by = blockedEntities.blocked_by;
    this.opportunities = blockedEntities.opportunities || [];
    this.users = blockedEntities.users || [];
    this.companies = blockedEntities.companies || [];
  }


  public getUsers(): string[] {
    return this.users;
  }

  public getOpportunities(): string[] {
    return this.opportunities;
  }

  public isOpportunityBlocked(opportunityId: string) {
    return this.opportunities.filter(item => item === opportunityId).length > 0;
  }

  public isCompanyBlocked(companyId: string) {
    return this.companies.filter(item => item === companyId).length > 0;
  }

  public isUserBlocked(userId: string) {
    return this.users.filter(item => item === userId).length > 0;
  }
}
