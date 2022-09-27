import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductStepsComponent} from "./product-steps/product-steps.component";

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add-product', component: ProductStepsComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
