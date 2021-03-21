import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { CartListener } from "./cart-listener";
import { CartItem } from "./cartitem";
import { Product } from "./product";
import { Shipping } from "./shipping";

@Injectable()
export class CartService {
  private items: Product[] = [];
  private listeners: CartListener[] = [];

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  addCartListener(listener: CartListener) {
    this.listeners.push(listener);
  }

  addToCart(product: Product) {
    this.db
      .collection("/cart")
      .add({
        productId: product.id,
        userId: this.authService.getUserId()
      })
      .then(() => {
        // notify listeners
        this.listeners.forEach(listener => {
          listener.notifyChange(this.items);
        });
      });
  }

  getItems(result: (cart: Product[]) => void) {
    var userId = this.authService.getUserId();
    return this.db
      .collection<CartItem>("/cart", ref => ref.where("userId", "==", userId))
      .valueChanges()
      .subscribe(items => {
        this.db
          .collection<Product>("/products")
          .valueChanges()
          .subscribe(products => {
            products = items.map<Product>(item => {
              return products.find(product => item.productId == product.id);
            });

            this.items = items.map<Product>(item => {
              return products.find(product => item.productId == product.id);
            });

            result(products);
          });
      });
  }

  clearCart(): void {
    var userId = this.authService.getUserId();
    var subscription = this.db
      .collection<CartItem>("/cart", ref => ref.where("userId", "==", userId))
      .valueChanges({ idField: "id" })
      .subscribe(items => {
        items.forEach(item => {
          this.db
            .collection<CartItem>("/cart")
            .doc(item.id)
            .delete();
        });

        subscription.unsubscribe();
      });

    this.getItems(items => (this.items = items));
  }

  getShippingPrices(trigger: (shipping: Shipping[]) => void): void {
    this.db
      .collection<Shipping>("/shipping")
      .valueChanges()
      .subscribe(values => {
        trigger(values);
      });
  }
}
