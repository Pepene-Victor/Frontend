import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {ProductControllerService} from "./api/services/product-controller.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'products-cli';

  constructor(private primengConfig: PrimeNGConfig, private _productService: ProductControllerService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }


}
