import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRoutingModule} from "./product-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductsListComponent} from "./products-list/products-list.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CardModule} from "primeng/card";
import {AccordionModule} from "primeng/accordion";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";


@NgModule({
  declarations: [ProductFormComponent,
  ProductsListComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RippleModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    CardModule,
    ProductRoutingModule,
    ToastModule,
    StepsModule
  ],
})
export class ProductModule { }
