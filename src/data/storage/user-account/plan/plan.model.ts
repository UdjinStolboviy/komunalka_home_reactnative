import { observable } from "mobx";
import { Gift, IGift } from "./gift.model";

export interface IPlan {
  productId: string;
  productName: string;
  expirationDate: string;
  expirationDateMs: number;
  originalTransactionId: string;
  purchaseToken: string;
  platform: string;
  active: boolean;
  gift?: IGift;
}

export class Plan {

  @observable
  private productId: string;

  @observable
  private productName: string;

  @observable
  private expirationDate: string;

  @observable
  private expirationDateMs: number;

  @observable
  private active: boolean;

  @observable
  private originalTransactionId: string;

  @observable
  private purchaseToken: string;

  @observable
  private platform: string;

  @observable
  private gift?: Gift;

  constructor(plan: IPlan) {
    this.productId = plan && plan.productId;
    this.productName = plan && plan.productName;
    this.expirationDate = plan && plan.expirationDate;
    this.expirationDateMs = plan && plan.expirationDateMs;
    this.active = plan && plan.active;
    this.originalTransactionId = plan && plan.originalTransactionId;
    this.purchaseToken = plan && plan.purchaseToken;
    this.platform = plan && plan.platform;
    this.gift = plan.gift && new Gift(plan.gift);
  }

  public getActive(): boolean {
    return this.active
  };

  public getProductId(): string {
    return this.productId
  };

  public getOriginalTransactionId(): string {
    return this.originalTransactionId;
  };

  public getPurchaseToken(): string {
    return this.purchaseToken;
  };

  public getProductName(): string {
    return this.productName
  };

  public getPlatform(): string {
    return this.platform;
  }


  getGift(): Gift | undefined {
    return this.gift;
  }
}
