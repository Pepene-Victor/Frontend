import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserControllerService} from "../../api/services/user-controller.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../api/services/auth.service";
import {AuthGuardService} from "../../api/services/auth-guard.service";
import {User} from "../../api/models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  isUserLogged?: boolean;
  navItems: MenuItem [] = [];
  constructor(private _router: Router,
              private _http: HttpClient,
              private _loginService: AuthService,
              private _authGuardService: AuthGuardService,
              private _userService: UserControllerService) { }

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Products',
        icon: 'pi pi-align-justify',
        items: [
          {label: 'Products list', icon: 'pi pi-chevron-right', routerLink: '/products'},
          {label: 'New product', icon: 'pi pi-plus', routerLink: '/products/add-product'}
        ]
      },
      {
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: 'user/account-details'
      }
    ];
    this.isUserLogged = this._userService.getIsLoggedIn();
  }

  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
  onLogout() {
    this._subscriptions.push(this._loginService.logout().subscribe({
      next: () => {
        console.log('Logout Success!');
        localStorage.clear();
        this._router.navigate(['/home'])
          .then(() => {
          window.location.reload();
        });
      },error: () => {
        this._router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      }
    }));
  }
}
