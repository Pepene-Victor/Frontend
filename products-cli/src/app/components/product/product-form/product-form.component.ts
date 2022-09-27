import { Component, OnInit } from '@angular/core';
import {EMPTY, map, Subscription, switchMap} from "rxjs";
import {ProductDto} from "../../../api/models/product-dto";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  private _subscriptions: Subscription [] = [];
  productForm!: FormGroup;
  items: MenuItem [] = [];
  formValidation: string = 'INVALID';
  showError: string = "";
  editProduct: boolean = false;


  constructor(private _fb: FormBuilder,
              private _productService: ProductControllerService,
              private _router: Router) {
    this._createProductForm();
    this._patchValueOfProductSteps();
    const product: ProductDto = this.productForm.getRawValue();
    this._productService.product$.next(product);
  }

  ngOnInit(): void {
    this._subscriptions.push( this._productService.isEdit$.pipe(
      switchMap((value: boolean) => {
        this.editProduct = value;
        if(this.editProduct){
          return this._productService.product$.pipe(
            map(product => product));
        }
        return EMPTY;
      })
    ).subscribe({
      next: (product: ProductDto) => {
        this.productForm.patchValue(product);
      }
    }));
  }
  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  saveProduct() {
    const product: ProductDto = this.productForm.getRawValue();
    this._subscriptions.push(this._productService.updateProductUsingPUT(product).subscribe({
      next: () => {
        console.log("Product updated!");
      },
      error: (error) => {{this.showError = error.error}}
    }));
    this._productService.productDialog$.next(false);
    this._productService.product$.next(product);
  }
  onNext() {
    this._productService.productToBeCreated$.next(this.productForm.getRawValue());
    this._productService.activeIndex$.next(1);
  }

  private _patchValueOfProductSteps(){
    this._subscriptions.push( this._productService.productToBeCreated$.subscribe({
      next: (product: ProductDto) => {
        this.productForm.patchValue(product);
      }
    }));
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

}
