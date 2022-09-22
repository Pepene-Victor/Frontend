import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";
import {Router} from "@angular/router";
import {LoginService} from "../../../api/services/login.service";

@Component({
  selector: 'app-change-user-details',
  templateUrl: './change-user-details.component.html',
  styleUrls: ['./change-user-details.component.scss']
})
export class ChangeUserDetailsComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _currentUserDetails!: User;
  private _newUserDetails?: User;
  showError: any;
  editForm!: FormGroup;
  accountDetailsType: string = "";
  formValidation: string = "INVALID";


  constructor(private _fb: FormBuilder,
              private _userService: UserControllerService,
              private _router: Router,
              private _loginService: LoginService) {
    this._createForm();
  }

  ngOnInit(): void {
    let loggedAccountUsername: string = this._userService.getLoggedAccountUsername();
    this.accountDetailsType = this._userService.getAccountDetailsType();
    this._subscriptions.push(this._userService.getUserByUsernameUsingGET(loggedAccountUsername).subscribe((user: User) =>{
         this._currentUserDetails = user;
    }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submitForm() {
    if(this.accountDetailsType == 'username'){
      const user: User = {
        username: this.editForm.controls.username.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);

      this._subscriptions.push(this._userService.updateUserNameUsingPUT(this._newUserDetails).subscribe({
        next: () => {
          alert('Username has been changed !')
          this.logout();
        },
        error: (error) => {{this.showError = error.error}}
      }));
    }
    else if(this.accountDetailsType == 'email'){
      const user: User = {

        email: this.editForm.controls.email.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);

      this._subscriptions.push(this._userService.updateUserEmailUsingPUT(this._newUserDetails).subscribe({
        next: () => {
          alert('Email has been changed !')
          this.logout();
        },
        error: (error) => {{this.showError = error.error}}
      }));
    }
    else{
      const user: User = {
        password: this.editForm.controls.password.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);
      this._subscriptions.push(this._userService.updateUserPasswordUsingPUT(this._newUserDetails).subscribe({
        next: () => {
          alert('Password has been changed !')
          this.logout();
        },
        error: (error) => {{this.showError = error.error}}
      }));
    }

  }
  logout(){
    this._userService.setIsUserLoggedStatus(false);
    this._subscriptions.push(this._loginService.logout().subscribe({
      next: () => {
        this._router.navigate(['/login'])
          .then(() => {
            window.location.reload();
          });
      },error: () => {
        this._router.navigate(['/login'])
          .then(() => {
            window.location.reload();
          });
      }
    }));
  }
  private _createForm(){
    this.editForm = this._fb.group({
      password: [null,
        [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-z0-9@$!%*?&]*$"),
          Validators.minLength(8),
          Validators.maxLength(20)]],
      confirmPassword: [null],
      username: [null,
        [Validators.pattern("^[A-Za-z0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(50)]],
      email: [null,
        [Validators.email]]
    });
    this._subscriptions.push(
      this.editForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
      })
    );

  }
}
