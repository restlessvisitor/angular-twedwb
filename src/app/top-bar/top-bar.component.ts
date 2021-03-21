import { Component } from "@angular/core";
import { AuthListener } from "../auth-listener";
import { AuthService } from "../auth.service";
import { CartListener } from "../cart-listener";
import { CartService } from "../cart.service";
import { Product } from "../product";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements CartListener, AuthListener {
  cartCount: number;

  constructor(private cart: CartService, private auth: AuthService) {}

  notifyUserChanged(userId: string): void {
    this.cart.getItems(items => {
      this.cartCount = items.length;
    });
  }

  notifyChange(products: Product[]): void {
    this.cartCount = products.length;
  }

  ngOnInit() {
    this.cart.getItems(items => {
      this.cartCount = items.length;
    });

    this.cart.addCartListener(this);
    this.auth.addAuthListener(this);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
