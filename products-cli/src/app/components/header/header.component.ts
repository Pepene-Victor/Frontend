import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserControllerService} from "../../api/services/user-controller.service";
import {Subscription} from "rxjs";
import {LoginService} from "../../api/services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  private _subscriptions: Subscription[] = [];
  navItems: MenuItem [] = [];
  constructor(private _router: Router,
              private _http: HttpClient,
              private _userService: UserControllerService,
              private _loginService: LoginService) { }

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
        routerLink: 'account-details'
      }
    ];
    this.isUserLogged = this._userService.getIsUserLoggedStatus();
    console.log(this.isUserLogged);
  }

  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
  onLogout() {
    this._userService.setIsUserLoggedStatus(false);
    this._subscriptions.push(this._loginService.logout().subscribe({
      next: () => {
        console.log('Logout Success!');
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
