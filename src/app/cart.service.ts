import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { CartItem } from "./cartitem";
import { Product } from "./product";
import { Shipping } from "./shipping";

@Injectable()
export class CartService {
  private items = [];
  private shipping: Shipping[];

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  addToCart(product: Product) {
    this.db
      .collection("/cart")
      .add({
        productId: product.id,
        userId: this.authService.getUserId()
      })
      .then(item => {
        this.items.push(product);
      });
  }

  getItems(result: (cart: Product[]) => void) {
    return this.db
      .collection<CartItem>("/cart")
      .valueChanges()
      .subscribe(items => {
        this.items = items;
        this.db
          .collection<Product>("/products")
          .valueChanges()
          .subscribe(products => {
            result(products.filter((product) => {
              items.find((item) => {
                item.productId == product.id
              }) != null;
            }));
          });
      });
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices(trigger: (shipping: Shipping[]) => void) {
    this.db
      .collection<Shipping>("/shipping")
      .valueChanges()
      .subscribe(values => {
        this.shipping = values;
        trigger(values);
      });
  }
}
