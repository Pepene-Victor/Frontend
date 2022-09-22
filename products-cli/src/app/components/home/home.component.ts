import { Component, OnInit } from '@angular/core';
import {UserControllerService} from "../../api/services/user-controller.service";
import {ProductControllerService} from "../../api/services/product-controller.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLogged: boolean = false;

  constructor(private _userService: UserControllerService, private _productService: ProductControllerService) { }

  ngOnInit(): void {
    this.isUserLogged = this._userService.getIsUserLoggedStatus();
  }

}
