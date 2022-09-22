import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {UserModule} from "./components/user/user.module";
import {interceptorProviders} from "./interceptors/interceptors";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StepsModule} from "primeng/steps";
import {ProductModule} from "./components/product/product.module";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    RippleModule,
    ProductModule,
    BrowserAnimationsModule,
    ToastModule,
    StepsModule,
    MenubarModule
  ],
  providers: [
    interceptorProviders,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
