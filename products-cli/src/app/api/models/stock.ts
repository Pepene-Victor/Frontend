/* tslint:disable */
import { Product } from './product';
export interface Stock {
  id?: number;
  price: number;
  product?: Product;
  quantity: number;
}
