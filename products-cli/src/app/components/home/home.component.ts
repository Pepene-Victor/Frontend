import { Component, OnInit } from '@angular/core';
import {UserControllerService} from "../../api/services/user-controller.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _user: UserControllerService) { }

  ngOnInit(): void {
  }

}
