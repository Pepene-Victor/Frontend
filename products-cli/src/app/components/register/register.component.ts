import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {LoginService} from "../../api/services/login.service";
import {Router} from "@angular/router";
import {UserControllerService} from "../../api/services/user-controller.service";
import {User} from "../../api/models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private _subscriptionList: Subscription[] = [];
  registerForm!: FormGroup;
  subscription?: Subscription;
  showError: string ="";
  formValidation: string = 'INVALID';

  constructor(private _fb: FormBuilder, private _router: Router, private _userService: UserControllerService) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptionList?.forEach(sub => {
      sub.unsubscribe();
    })
  }

  private _createForm(){
    this.registerForm = this._fb.group({
      password: [null,
        [Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-z0-9@$!%*?&]*$"),
        Validators.min(8),
        Validators.max(20)]],
      username: [null,
        [Validators.required,
        Validators.pattern("^[A-Za-z0-9]*$"),
        Validators.min(5),
        Validators.max(50)]],
      email: [null,
        [Validators.required,
        Validators.email]],
      confirmPassword: [null]
    })
    this._subscriptionList.push(
      this.registerForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
        console.log('Form status', this.formValidation);
      })
    );
  }

  submitForm() {
    console.log(this.registerForm.getRawValue());
    const user: User = {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
    };
    console.log(user);
    this._subscriptionList.push(this._userService.registerUserUsingPOST(user).subscribe({
      next: value => {
        console.log("Register success!");
        this._router.navigate(['/home']);
      },
      error: (error) => {{this.showError = error.error}}
    }));
  }
}