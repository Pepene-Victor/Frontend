import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from "primeng/accordion";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserRoutingModule} from "./user-routing.module";
import {AccountDetailsComponent} from "./account-details/account-details.component";
import {ChangeUserDetailsComponent} from "./change-user-details/change-user-details.component";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    ChangeUserDetailsComponent,
    AccountDetailsComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        AccordionModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RippleModule
    ]
})
export class UserModule { }
