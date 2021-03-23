import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger
} from "@angular/animations";

export const slideInAnimation = trigger("routeAnimations", [
  transition("CartPage <=> ShippingPage", [
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        width: "100%"
      })
    ]),
    query(":enter", [style({ left: "-100%" })]),
    query(":leave", animateChild()),
    group([
      query(":leave", [animate("3300ms ease-out", style({ left: "100%" }))]),
      query(":enter", [animate("3300ms ease-out", style({ left: "0%" }))])
    ]),
    query(":enter", animateChild())
  ])
]);
