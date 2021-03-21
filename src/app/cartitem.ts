export class CartItem {
  public id: string;
  public productId: number;
  public userId: string;

  constructor(productId: number, userId: string) {
    this.productId = productId;
    this.userId = userId;
  }
}