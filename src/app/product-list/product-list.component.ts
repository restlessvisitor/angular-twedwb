import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  products;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.db
      .list("/products")
      .valueChanges()
      .subscribe(values => {
        values.forEach(value => console.log(value));
        console.log(values);
        this.products = values;
      });
  }

  share() {
    window.alert("The product has been shared!");
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
