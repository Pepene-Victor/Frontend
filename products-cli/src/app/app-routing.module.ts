import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuardService} from "./api/services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: "*", redirectTo:"/home" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule), canActivate : [AuthGuardService] },
  { path: 'products', loadChildren: () => import('./components/product/product.module').then((m) => m.ProductModule), canActivate : [AuthGuardService] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
