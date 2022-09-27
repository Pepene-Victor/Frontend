import {Component, OnInit} from '@angular/core';
import {UserControllerService} from "../../../api/services/user-controller.service";


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  username?: string;
  email?: string;
  creationDate?: string ;

  constructor(private _userService: UserControllerService) {
  }

  ngOnInit(): void {
    let loggedAccount = this._userService.getLoggedAccount();
    this.username = loggedAccount.username;
    this.email = loggedAccount.email;
    this.creationDate = loggedAccount.creationDate;
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
