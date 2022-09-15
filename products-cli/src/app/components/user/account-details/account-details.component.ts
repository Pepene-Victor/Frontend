import {Component, Input, OnInit} from '@angular/core';
import {first, Subscription} from "rxjs";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";
import {LoginService} from "../../../api/services/login.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  username?: string;
  email?: string;
  creationDate?: string ;
  subscription?: Subscription;
  subscriptionList: Subscription[] = [];
  constructor(private _userService: UserControllerService) {
  }
  ngOnInit(): void {
    let loggedAccountUsername: string = "";
    this.subscriptionList.push(this._userService.loggedUser$.subscribe((username: string) => {
      loggedAccountUsername = username;
      console.log(loggedAccountUsername);
    }),
    this.subscription = this._userService.getUserByUsernameUsingGET(loggedAccountUsername).subscribe((user: User) =>{
      this.username = user.username;
      this.email = user.email;
      this.creationDate = user.creationDate;
    }));
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  changeEmail(){
    this._userService.accountDetailsType$.next('email')
  }
  changeUsername(){
    this._userService.accountDetailsType$.next('username')
  }
  changePassword(){
    this._userService.accountDetailsType$.next('password')
  }
}
