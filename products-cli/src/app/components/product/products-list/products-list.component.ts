import { Component, OnInit } from '@angular/core';
import {ProductDto} from "../../../api/models/product-dto";
import {Subscription} from "rxjs";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {FormBuilder} from "@angular/forms";
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
  stockDialog: boolean = false;
  isReadOnly: boolean = true;

  constructor(private _fb: FormBuilder, private _productService: ProductControllerService,
              private _confirmationService: ConfirmationService, private _messageService: MessageService,
              private _stockService: StockControllerService, private _router: Router) {
    this._getDialogProductStatus();
    this._updateProductInList();
    this._getDialogStockStatus();
    this._getIsReadOnlyStatus();
  }

  ngOnInit(): void {
    this._subscriptions.push(this._productService.getAllProductsUsingGET().subscribe((products: ProductDto[]) =>{
      this.products = products;
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
      if(!!this._selectedStock){
        this._stockService.isReadOnlyStatus$.next(true);
        this._stockService.isStockDetails$.next(true);
        this._stockService.stock$.next(this._selectedStock);
      }
    }));
    this.stockDialog = true;
  }

  editProduct(product: ProductDto) {
    this.productDialog = true;
    this._productService.product$.next(product);
    this._productService.isEdit$.next(true);
  }

  hideDialog() {
    this.productDialog = false;
    this.stockDialog = false;
    this.isReadOnly = true;
    this._stockService.isReadOnlyStatus$.next(this.isReadOnly);
  }

  editStock() {
    this.isReadOnly = false;
    this._stockService.isReadOnlyStatus$.next(this.isReadOnly);
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
            const index = this.products.indexOf(product);
            this.products.splice(index, 1);
          }
        }));
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }
  private _getDialogProductStatus(){
    this._subscriptions.push(
      this._productService.productDialog$.subscribe({
        next: value => {
          this.productDialog = value;
        }
      }));
  }
  private _getDialogStockStatus(){
    this._subscriptions.push(
      this._stockService.stockDialog$.subscribe({
        next: value => {
          this.stockDialog = value;
        }
      }));
  }
  private _getIsReadOnlyStatus(){
    this._subscriptions.push(this._stockService.isReadOnlyStatus$.subscribe({
      next: value => {
        this.isReadOnly = value;
      }
    }));
  }

  private _updateProductInList(){
    this._subscriptions.push(this._productService.product$.subscribe({
      next: (product: ProductDto) => {
        const foundIndex = this.products.findIndex((productToUpdate: ProductDto) => product.pzn === productToUpdate.pzn);
        this.products[foundIndex] = product;
      }
    }));
  }
}
