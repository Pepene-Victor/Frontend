import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../api/services/login.service";
import {first, Subscription} from "rxjs";
import {UserControllerService} from "../../api/services/user-controller.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  loginForm!: FormGroup;
  showError: boolean = false;
  formValidation: string = 'INVALID';

  constructor(private _fb: FormBuilder, private _loginService: LoginService, private _router: Router, private _userService: UserControllerService) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  submitForm() {
    const loggedAccountUsername = this.loginForm.controls.username.value;
    console.log(loggedAccountUsername);
    this._userService.setLoggedAccountUsername(loggedAccountUsername);
    const uploadData = new FormData()
    uploadData.append('username', this.loginForm.get('username')?.value);
    uploadData.append('password', this.loginForm.get('password')?.value);
    this._subscriptions.push(this._loginService.login(uploadData).pipe(first()).subscribe({
      next: () => {
        console.log("Login Success!");
        this._userService.setIsUserLoggedStatus(true);
        this._router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      },
      error: () => {{this.showError = true}}
    }));
  }

  private _createForm(){
    this.loginForm = this._fb.group({
      password: [null,
        [Validators.required]],
      username: [null,
        [Validators.required]]
    })
    this._subscriptions.push(
      this.loginForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
        console.log('Form status', this.formValidation);
      })
    );
  }
}
