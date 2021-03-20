import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Product } from "./product";

@Injectable()
export class DatabaseService {
  private products: Product[];

  constructor(private db: AngularFirestore) {
    this.db
      .collection<Product>("/products")
      .valueChanges()
      .subscribe(values => {
        this.products = values;
      });
  }

  getProducts() {
    return this.products;
  }
}
