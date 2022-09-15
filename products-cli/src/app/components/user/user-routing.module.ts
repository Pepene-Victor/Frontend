import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountDetailsComponent} from "./account-details/account-details.component";
import {ChangeUserDetailsComponent} from "./change-user-details/change-user-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'change-user-details', component: ChangeUserDetailsComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
