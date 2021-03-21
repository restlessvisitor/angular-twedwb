import { Product } from "./product";

export interface CartListener {
  notifyChange(products: Product[]): void;
}