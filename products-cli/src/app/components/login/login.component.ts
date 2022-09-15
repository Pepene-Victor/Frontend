import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../api/services/login.service";
import {first, Subscription} from "rxjs";
import {User} from "../../api/models/user";
import {UserControllerService} from "../../api/services/user-controller.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  subscription?: Subscription;
  showError: boolean = false;

  constructor(private _fb: FormBuilder, private _loginService: LoginService, private _router: Router, private _userService: UserControllerService) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  submitForm() {
    const loggedUsername = this.loginForm.controls.username.value;
    console.log(loggedUsername);
    this._userService.loggedUser$.next(loggedUsername);
    const uploadData = new FormData()
    uploadData.append('username', this.loginForm.get('username')?.value);
    uploadData.append('password', this.loginForm.get('password')?.value);
    this.subscription = this._loginService.login(uploadData).pipe(first()).subscribe({
      next: value => {
        console.log("Login Success!");
        this._router.navigate(['/home']);
      },
      error: (error) => {{this.showError = true}}
    });
  }

  private _createForm(){
    this.loginForm = this._fb.group({
      password: [null],
      username: [null]
    })
    console.log(this.loginForm.getRawValue());
  }

  // showLogin() {
  //   return !window.location.href.includes('account-details');
  // }
}
