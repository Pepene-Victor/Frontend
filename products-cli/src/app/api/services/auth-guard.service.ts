import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserControllerService} from "./user-controller.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _userService: UserControllerService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const user: User =  this._userService.getLoggedAccount();
      if (!!user) {return true;
      }else{
        this._router.navigate(['login'],{ queryParams: { retUrl: route.url} });
        return false;
      }
  }
}
