import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {ProductDto} from "../../../api/models/product-dto";
import {Subscription} from "rxjs";
import {StockDto} from "../../../api/models/stock-dto";
import {StockControllerService} from "../../../api/services/stock-controller.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private _subscriptions: Subscription [] = [];
  private _savedProduct!: ProductDto;
  productForm!: FormGroup;
  activeIndex: number = 0;
  items: MenuItem [] = [];
  stockForm!: FormGroup;
  formValidation: string = 'INVALID';
  showError: string = "";

  constructor(private _fb: FormBuilder,
              private _productService: ProductControllerService,
              private _router: Router,
              private _stockService: StockControllerService) {
    this._createProductForm();
    this._createStockForm();
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
    })
  }

  nextPage() {
    this.activeIndex = 1;
  }
  saveProduct() {
    const product: ProductDto = this.productForm.getRawValue();
    while(product.pzn.length < 8){
      product.pzn = '0' + product.pzn;
    }
    this._subscriptions.push(this._productService.createProductUsingPOST(product).subscribe({
      next: () => {
        console.log("Product created!");
        this.saveStockForProduct();
      },
      error: (error) => {{this.showError = error.error}}
    }));
    this._savedProduct = product;

  }
  saveStockForProduct(){
    const stock: StockDto = this.stockForm.getRawValue();
    const params = {stockDto: stock, productId: this._savedProduct.pzn};
    this._subscriptions.push(this._stockService.createStockUsingPOST(params).subscribe({
      next: () => {
        console.log("Stock created!");
        this._router.navigate(['/products'])
          .then(() => {
            window.location.reload();
          });
      },
      error: (error) => {{this.showError = error.error}}
    }));
  }
  previousPage() {
    this.activeIndex = 0;
  }
  private _createProductForm(){
    this.productForm = this._fb.group({
      packageSize: [null,
        [Validators.required,
        Validators.maxLength(20)]],
      productName: [null,
        [Validators.required,
          Validators.maxLength(100)]],
      pzn: [null,
        [Validators.required,
          Validators.maxLength(8),
          Validators.pattern("^[0-9]*$")]],
      strength: [null,
        [Validators.required,
          Validators.maxLength(100)]],
      supplier: [null,
        [Validators.maxLength(100)]],
      unit: [null,
        [Validators.required,
          Validators.maxLength(2)]],
    });
    this._subscriptions.push(
      this.productForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
      })
    );
  }
  private _createStockForm(){
    this.stockForm = this._fb.group({
      quantity: [null,
        [Validators.required,
          Validators.pattern("^[0-9]*$")
        ]],
      price: [null,
        [Validators.required,
        Validators.pattern("^[0-9.]*$")]]
    });
    this._subscriptions.push(
      this.stockForm.statusChanges.subscribe((value: FormControlStatus) =>{
        this.formValidation = value;
      })
    );
  }


}
