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
        this.items.push(product);

        // notify listeners
        this.listeners.forEach(listener => {
          console.log("Notifying cart listener");
          listener.notifyChange(this.items);
        });
      });
  }

  getItems(result: (cart: Product[]) => void) {
    var userId = this.authService.getUserId();
    console.log("userid", userId);
    return this.db
      .collection<CartItem>("/cart", ref => ref.where("userId", "==", userId))
      .valueChanges()
      .subscribe(items => {
        console.log("cart", items);
        this.db
          .collection<Product>("/products")
          .valueChanges()
          .subscribe(products => {
            console.log("products", products);
            products = items.map<Product>(item => {
              return products.find(product => item.productId == product.id)
            });

            console.log("productsafter", products);

            this.items = items.map<Product>(item => {
              return products.find(product => item.productId == product.id)
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
