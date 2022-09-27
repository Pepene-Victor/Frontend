import { Component, OnInit } from '@angular/core';
import {UserControllerService} from "../../api/services/user-controller.service";
import {AuthGuardService} from "../../api/services/auth-guard.service";
import {User} from "../../api/models/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  isUserLogged: boolean = false;

  constructor(private _authGuardService: AuthGuardService,
              private _userService: UserControllerService,
              private _router: Router) { }

  ngOnInit(): void {
    const loggedAccountUsername = this._userService.getLoggedAccountUsername();
    this._subscriptions.push(this._userService.getUserByUsernameUsingGET(loggedAccountUsername).subscribe({
      next: (user: User) => {
        this._userService.setLoggedAccount(user);
        console.log(loggedAccountUsername);
      },
      error: () =>{
        localStorage.clear();
      }
    }));
    this.isUserLogged = this._userService.getIsLoggedIn();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
