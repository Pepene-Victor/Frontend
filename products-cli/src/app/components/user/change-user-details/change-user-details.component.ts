import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../../api/services/auth.service";

@Component({
  selector: 'app-change-user-details',
  templateUrl: './change-user-details.component.html',
  styleUrls: ['./change-user-details.component.scss']
})
export class ChangeUserDetailsComponent implements OnInit {
  accountDetailsType: string = "";
  title: string = "";

  constructor(private _userService: UserControllerService) {
  }

  ngOnInit(): void {
    this.accountDetailsType = this._userService.getAccountDetailsType();
    this.title = `Change ${this.accountDetailsType}`;
  }
}

