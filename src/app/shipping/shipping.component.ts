import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Shipping } from '../shipping';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ShippingComponent implements OnInit {
  shippingCosts: Shipping[];
  displayedColumns: string[] = ['type', 'price'];
  expandedElement: Shipping | null;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getShippingPrices((shipping) => {
      this.shippingCosts = shipping;
    });
  }
}