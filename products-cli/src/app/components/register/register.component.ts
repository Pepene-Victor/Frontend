import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserControllerService} from "../../api/services/user-controller.service";
import {User} from "../../api/models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
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
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  private _createForm(){
    this.registerForm = this._fb.group({
      password: [null,
        [Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-z0-9@$!%*?&]*$"),
        Validators.minLength(8),
        Validators.maxLength(20)]],
      username: [null,
        [Validators.required,
        Validators.pattern("^[A-Za-z0-9]*$"),
        Validators.minLength(5),
        Validators.maxLength(50)]],
      email: [null,
        [Validators.required,
        Validators.email]],
      confirmPassword: [null,
        [Validators.required]]
    })
    this._subscriptions.push(
      this.registerForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
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
    this._subscriptions.push(this._userService.registerUserUsingPOST(user).subscribe({
      next: () => {
        console.log("Register success!");
        this._router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      },
      error: (error) => {{this.showError = error.error}}
    }));
  }
}
