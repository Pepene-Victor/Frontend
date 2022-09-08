import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StockFormComponent } from './components/stock/stock-form/stock-form.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { ChangeUsernameComponent } from './components/user/change-username/change-username.component';
import { AccountDetailsComponent } from './components/user/account-details/account-details.component';
import { StockDetailsComponent } from './components/stock/stock-details/stock-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    StockFormComponent,
    ProductFormComponent,
    ChangePasswordComponent,
    ChangeUsernameComponent,
    AccountDetailsComponent,
    StockDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
