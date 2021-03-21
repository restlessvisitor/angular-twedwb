import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
import { FormBuilder } from "@angular/forms";
import { Product } from "../product";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class CartComponent implements OnInit {
  items: Product[];
  displayedColumns: string[] = ["name", "price"];
  checkoutForm = this.formBuilder.group({
    name: "",
    address: ""
  });
  expandedElement: Product | null;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cartService.getItems(items => {
      this.items = items;
    });
  }

  onSubmit(): void {
    // Process checkout data here
    this.cartService.clearCart();
    console.warn("Your order has been submitted", this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  removeItem(product: Product) {
    const dialogRef = this.dialog.open(CartRemoveItemDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "yes") {
        this.cartService.removeItem(product);
      }
    });
  }
}

@Component({
  selector: "cart-remove-item-dialog",
  templateUrl: "cart-remove-item-dialog.html"
})
export class CartRemoveItemDialog {
  constructor(public dialogRef: MatDialogRef<CartRemoveItemDialog>) {}

  onNo() {
    this.dialogRef.close({ event: "no" });
  }

  onYes() {
    this.dialogRef.close({ event: "yes" });
  }
}
