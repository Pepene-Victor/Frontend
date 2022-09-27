import { Component, OnInit } from '@angular/core';
import {EMPTY, map, Subscription, switchMap} from "rxjs";
import {MenuItem} from "primeng/api";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StockControllerService} from "../../../api/services/stock-controller.service";
import {StockDto} from "../../../api/models/stock-dto";
import {ProductDto} from "../../../api/models/product-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  private _subscriptions: Subscription [] = [];
  private _selectedStock: StockDto = {} as StockDto;
  items: MenuItem [] = [];
  stockForm!: FormGroup;
  formValidation: string = 'INVALID';
  showError: string = "";
  isReadOnly: boolean = false;
  productToSave!: ProductDto;
  isStockDetails: boolean = false;


  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _stockService: StockControllerService,
              private _productService: ProductControllerService) {

    this._createStockForm();
    this._getIsReadOnlyStatus();
    this._getProductFromSteps();
    this._getIsStockDetails();

    this._subscriptions.push(this._stockService.stockToBeCreated$.subscribe({
      next: value => {
        this.stockForm.patchValue(value);
      }
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this._stockService.isStockDetails$.next(false);
  }

  saveStock() {
    const stock: StockDto = {
      id: this._selectedStock.id,
      price: this.stockForm.controls.price.value,
      quantity: this.stockForm.controls.quantity.value
    }
    this._subscriptions.push(this._stockService.updateStockUsingPUT(stock).subscribe({
      next: () => {
        console.log("Stock updated!");
      },
      error: (error) => {{this.showError = error.error}}
    }));

    this._stockService.isReadOnlyStatus$.next(true);
    this._stockService.stockDialog$.next(false);
    this._stockService.stock$.next(stock);
  }

  createProduct() {
    while(this.productToSave.pzn.length < 8){
      this.productToSave.pzn = '0' + this.productToSave.pzn;
    }
    const stock: StockDto = this.stockForm.getRawValue();
    const params = {stockDto: stock, productId: this.productToSave.pzn};
    this._subscriptions.push(this._productService.createProductUsingPOST(this.productToSave).pipe(
      switchMap(() => this._stockService.createStockUsingPOST(params))
    ).subscribe({
      next: () => {
        console.log("Product with stock created!");
        this._router.navigate(['/products']);
      },
      error: (error) => {this.showError = error.error}
    }));
  }

  previousPage() {
    this._productService.activeIndex$.next(0);
    this._stockService.stockToBeCreated$.next(this.stockForm.getRawValue());
  }

  private _getProductFromSteps(){
    this._subscriptions.push(this._productService.productToBeCreated$.subscribe({
      next: (product: ProductDto) => {
        this.productToSave = product;
      }
    }))
  }

  private _getIsReadOnlyStatus(){
    this._subscriptions.push(this._stockService.isReadOnlyStatus$.subscribe({
      next: value => {
        this.isReadOnly = value;
      }
    }));
  }

  private _getIsStockDetails(){
    this._subscriptions.push(this._stockService.isStockDetails$.pipe(
      switchMap((value: boolean) => {
        this.isStockDetails = value;
        if(this.isStockDetails){
          return this._stockService.stock$.pipe(
            map(stock => stock),);
        }
        return EMPTY;
      })
    ).subscribe({
      next: (stock: StockDto) => {
        this._selectedStock = stock ;
        this.stockForm.patchValue(stock);
      }
    }));
  }

  private _createStockForm(){
    this.stockForm = this._fb.group({
      quantity: [null,
        [Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ]],
      price: [null,
        [Validators.required,
          Validators.pattern("^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$")]]
    });
    this._subscriptions.push(
      this.stockForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
      })
    );
  }
}
