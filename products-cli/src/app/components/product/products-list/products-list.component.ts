import { Component, OnInit } from '@angular/core';
import {ProductDto} from "../../../api/models/product-dto";
import {Subscription} from "rxjs";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {StockControllerService} from "../../../api/services/stock-controller.service";
import {StockDto} from "../../../api/models/stock-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  private _subscriptions: Subscription [] = [];
  private _selectedStock!: StockDto;
  products: ProductDto [] = [];
  productDialog: boolean = false;
  productForm!: FormGroup;
  stockDialog: boolean = false;
  stockForm!: FormGroup;
  isReadOnly: boolean = true;

  constructor(private _fb: FormBuilder, private _productService: ProductControllerService,
              private _confirmationService: ConfirmationService, private _messageService: MessageService,
              private _stockService: StockControllerService, private _router: Router) {
  this._createProductForm();
  this._createStockForm();
  }

  ngOnInit(): void {
    this._subscriptions.push(this._productService.getAllProductsUsingGET().subscribe((products: ProductDto[]) =>{
      this.products= products;
      console.log(this.products);
    }));
  }

  ngOnDestroy(){
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  stockDetails(product: ProductDto) {
    this._subscriptions.push(this._stockService.getStockByProductIdUsingGET(product.pzn).subscribe((stock: StockDto) => {
      this._selectedStock = stock;
      if(!!this._selectedStock)
        this.stockForm.patchValue(this._selectedStock);
    }));
    this.stockDialog = true;
  }

  editProduct(product: ProductDto) {
    this.productDialog = true;
    this.productForm.patchValue(product);
  }

  hideDialog() {
    this.productDialog = false;
    this.stockDialog = false;
  }

  editStock() {
    this.isReadOnly = false;
  }

  saveProduct() {
    const product: ProductDto = this.productForm.getRawValue();
    this._subscriptions.push(this._productService.updateProductUsingPUT(product).subscribe({
      next: () => {
        console.log("Product updated!");
        this._refreshPage();
      },
      // error: (error) => {{this.showError = error.error}}
    }));
    this.productDialog = false;
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
        this._refreshPage();
      },
      // error: (error) => {{this.showError = error.error}}
    }));

    this.isReadOnly = true;
    this.stockDialog = false;
  }

  deleteProduct(product: ProductDto) {
    const id: string = product.pzn;
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete the product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._subscriptions.push(this._productService.deleteProductUsingDELETE(id).subscribe({
          next: () => {
            this._refreshPage();
          }
        }));
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }
  private _refreshPage(){
    this._router.navigate(['/products'])
      .then(() => {
        window.location.reload();
      });
  }

  private _createProductForm(){
    this.productForm = this._fb.group({
      packageSize: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      pzn: [null, [Validators.required]],
      strength: [null, [Validators.required]],
      supplier: [null,],
      unit: [null, [Validators.required]],
    })
  }

  private _createStockForm(){
    this.stockForm = this._fb.group({
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]]
    })
  }


}
