import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";

@Component({
  selector: 'app-change-user-details',
  templateUrl: './change-user-details.component.html',
  styleUrls: ['./change-user-details.component.scss']
})
export class ChangeUserDetailsComponent implements OnInit {
  private _subscriptionList: Subscription[] = [];
  private _currentUserDetails?: User;
  showError: any;
  editForm!: FormGroup;
  accountDetailsType: string = "";


  constructor(private _fb: FormBuilder, private _userService: UserControllerService) {
    this._createForm();
  }

  ngOnInit(): void {
    let loggedAccountUsername: string = "";
    this._subscriptionList.push(this._userService.loggedUser$.subscribe((username: string) => {
        loggedAccountUsername = username;
        console.log(loggedAccountUsername);
    }),this._userService.accountDetailsType$.subscribe((value: string) => {
        this.accountDetailsType = value;
        console.log(this.accountDetailsType);
    }),this._userService.getUserByUsernameUsingGET(loggedAccountUsername).subscribe((user: User) =>{
         this._currentUserDetails = user;
    }));
  }

  ngOnDestroy(): void {
    this._subscriptionList?.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submitForm() {

  }
  private _createForm(){
    this.editForm = this._fb.group({
      password: [null,
        [Validators.required,
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-z0-9@$!%*?&]*$"),
          Validators.min(8),
          Validators.max(20)]],
      confirmPassword: [null],
      username: [null,
        [Validators.required,
          Validators.pattern("^[A-Za-z0-9]*$"),
          Validators.min(5),
          Validators.max(50)]],
      email: [null,
        [Validators.required,
          Validators.email]],
    })
    console.log(this.editForm.getRawValue());
  }
}
