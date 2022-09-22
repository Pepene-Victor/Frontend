import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductsListComponent} from "./products-list/products-list.component";

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add-product', component: ProductFormComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
