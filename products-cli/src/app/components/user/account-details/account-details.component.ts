import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  username?: string;
  email?: string;
  creationDate?: string ;
  private _subscriptions: Subscription[] = [];
  constructor(private _userService: UserControllerService) {
  }
  ngOnInit(): void {
    let loggedAccountUsername = this._userService.getLoggedAccountUsername();
    this._subscriptions.push(this._userService.getUserByUsernameUsingGET(loggedAccountUsername).subscribe((user: User) =>{
      this.username = user.username;
      this.email = user.email;
      this.creationDate = user.creationDate;
    }));

  }
  ngOnDestroy(){
    this._subscriptions?.forEach(sub =>{
      sub.unsubscribe();
    })
  }

  changeEmail(){
    this._userService.setAccountDetailsType('email');
  }
  changeUsername(){
    this._userService.setAccountDetailsType('username');
  }
  changePassword(){
    this._userService.setAccountDetailsType('password');
  }
}
