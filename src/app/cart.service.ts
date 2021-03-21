import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { CartListener } from "./cart-listener";
import { CartItem } from "./cartitem";
import { Product } from "./product";
import { Shipping } from "./shipping";

@Injectable()
export class CartService {
  private items: Product[] = null;
  private listeners: CartListener[];

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
        this.items.push(product);

        // notify listeners
        this.listeners.forEach(listener => {
          listener.notifyChange(this.items);
        });
      });
  }

  getItems(result: (cart: Product[]) => void) {
    return this.db
      .collection<CartItem>("/cart")
      .valueChanges()
      .subscribe(items => {
        this.db
          .collection<Product>("/products")
          .valueChanges()
          .subscribe(products => {
            var product: Product;
            products.filter(product => {
              items.find(item => {
                item.productId == product.id;
              }) != null;
            });
            this.items = items.map(item => {
              return product;
            });
            result(products);
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
        trigger(values);
      });
  }
}
