import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Shipping } from "./shipping";

@Injectable()
export class CartService {
  private items = [];
  private shipping: Shipping[];

  constructor(private db: AngularFirestore) {}

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
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
