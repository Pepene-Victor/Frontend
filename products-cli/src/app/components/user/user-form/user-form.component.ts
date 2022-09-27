import { Component, OnInit } from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {User} from "../../../api/models/user";
import {AuthService} from "../../../api/services/auth.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _currentUserDetails!: User;
  private _newUserDetails?: User;
  userForm!: FormGroup;
  subscription?: Subscription;
  showError: string = "";
  formValidation: string = 'INVALID';
  accountDetailsType?: string;


  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _userService: UserControllerService,
              private _authService: AuthService) {
    this._createForm();
  }

  ngOnInit(): void {
    let loggedAccount: User = this._userService.getLoggedAccount();
    this.accountDetailsType = this._userService.getAccountDetailsType();
    this._currentUserDetails = loggedAccount;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  create() {
    console.log(this.userForm.getRawValue());
    const user: User = {
      username: this.userForm.controls.username.value,
      password: this.userForm.controls.password.value,
      email: this.userForm.controls.email.value,
    };
    this._subscriptions.push(this._userService.registerUserUsingPOST(user).subscribe({
      next: () => {
        console.log("Register success!");
        this._router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      },
      error: (error) => {
        {
          this.showError = error.error
        }
      }
    }));
  }

  save() {
    if (this.accountDetailsType == 'username') {
      const user: User = {
        username: this.userForm.controls.username.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);

      this._subscriptions.push(this._userService.updateUserNameUsingPUT(this._newUserDetails).pipe(
        switchMap(() => this._authService.logout())
      ).subscribe({
        next: () => {
          localStorage.clear();
          alert('Username has been changed !');
          this._reloadLoginPage();
        },
        error: (error) => {
          {
            this.showError = error.error
          }
        }
      }));
    } else if (this.accountDetailsType == 'email') {
      const user: User = {

        email: this.userForm.controls.email.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);

      this._subscriptions.push(this._userService.updateUserEmailUsingPUT(this._newUserDetails).pipe(
        switchMap(() => this._authService.logout())
      ).subscribe({
        next: () => {
          localStorage.clear();
          alert('Email has been changed !');
          this._reloadLoginPage();
        },
        error: (error) => {
          {
            this.showError = error.error
          }
        }
      }));
    } else {
      const user: User = {
        password: this.userForm.controls.password.value
      }
      this._newUserDetails = Object.assign(this._currentUserDetails, user);
      this._subscriptions.push(this._userService.updateUserPasswordUsingPUT(this._newUserDetails).pipe(
        switchMap(() => this._authService.logout())
      ).subscribe({
        next: () => {
          localStorage.clear();
          alert('Password has been changed !');
          this._reloadLoginPage();
        },
        error: (error) => {
          {
            this.showError = error.error
          }
        }
      }));
    }
  }

  private _reloadLoginPage(){
    this._router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

  private _createForm() {
    this.userForm = this._fb.group({
      password: [null,
        [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-z0-9@$!%*?&]*$"),
          Validators.minLength(8),
          Validators.maxLength(20)]],
      username: [null,
        [Validators.pattern("^[A-Za-z0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(50)]],
      email: [null,
        [Validators.email]],
      confirmPassword: [null]
    })
    this._subscriptions.push(
      this.userForm.statusChanges.subscribe((value: FormControlStatus) => {
        this.formValidation = value;
      })
    );
  }
}

