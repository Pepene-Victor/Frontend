import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StockFormComponent } from './components/stock/stock-form/stock-form.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { StockDetailsComponent } from './components/stock/stock-details/stock-details.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {UserModule} from "./components/user/user.module";
import {UserRoutingModule} from "./components/user/user-routing.module";
import {interceptorProviders} from "./interceptors/interceptors";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    HeaderComponent,
    FooterComponent,
    StockFormComponent,
    ProductFormComponent,
    StockDetailsComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UserModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
