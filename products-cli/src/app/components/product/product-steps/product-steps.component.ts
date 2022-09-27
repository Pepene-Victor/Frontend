import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {Router} from "@angular/router";
import {StockControllerService} from "../../../api/services/stock-controller.service";
import {ProductDto} from "../../../api/models/product-dto";
import {StockDto} from "../../../api/models/stock-dto";


@Component({
  selector: 'app-product-steps',
  templateUrl: './product-steps.component.html',
  styleUrls: ['./product-steps.component.scss']
})
export class ProductStepsComponent implements OnInit {

  private _subscriptions: Subscription [] = [];
  activeIndex: number = 0;
  items: MenuItem [] = [];

  constructor(private _fb: FormBuilder,
              private _productService: ProductControllerService,
              private _router: Router,
              private _stockService: StockControllerService) {

    this._getActiveIndex();
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Product',
    },
      {
        label: 'Stock',
      }
    ];
  }
  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this._productService.productToBeCreated$.next({} as ProductDto);
    this._stockService.stockToBeCreated$.next({} as StockDto);
  }

  private _getActiveIndex(){
    this._subscriptions.push(this._productService.activeIndex$.subscribe({
      next: value => {
        this.activeIndex = value;
      }
    }));
  }
}
