export class CartItem {
  public productId: number;
  public userId: string;

  constructor(productId: number, userId: string) {
    this.productId = productId;
    this.userId = userId;
  }
}