/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import {BehaviorSubject, Observable as __Observable, Subject} from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProductDto } from '../models/product-dto';

/**
 * Product Controller
 */
@Injectable({
  providedIn: 'root',
})
class ProductControllerService extends __BaseService {

  isEdit$: Subject<boolean> = new Subject<boolean>();
  productDialog$: Subject<boolean> = new Subject<boolean>();
  product$: BehaviorSubject<ProductDto> = new BehaviorSubject<ProductDto>({} as ProductDto);
  productToBeCreated$: BehaviorSubject<ProductDto> = new BehaviorSubject<ProductDto>({} as ProductDto);
  activeIndex$: Subject<number> = new Subject<number>();

  static readonly getAllProductsUsingGETPath = '/products';
  static readonly createProductUsingPOSTPath = '/products/create';
  static readonly deleteProductUsingDELETEPath = '/products/delete/{id}';
  static readonly updateProductUsingPUTPath = '/products/update';
  static readonly getProductByIdUsingGETPath = '/products/{id}';


  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllProducts
   * @return OK
   */
  getAllProductsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ProductDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }
  /**
   * getAllProducts
   * @return OK
   */
  getAllProductsUsingGET(): __Observable<Array<ProductDto>> {
    return this.getAllProductsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ProductDto>)
    );
  }

  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOSTResponse(product: ProductDto): __Observable<__StrictHttpResponse<ProductDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/products/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDto>;
      })
    );
  }
  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOST(product: ProductDto): __Observable<ProductDto> {
    return this.createProductUsingPOSTResponse(product).pipe(
      __map(_r => _r.body as ProductDto)
    );
  }

  /**
   * deleteProduct
   * @param id id
   */
  deleteProductUsingDELETEResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/products/delete/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * deleteProduct
   * @param id id
   */
  deleteProductUsingDELETE(id: string): __Observable<null> {
    return this.deleteProductUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUTResponse(product: ProductDto): __Observable<__StrictHttpResponse<ProductDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/products/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDto>;
      })
    );
  }
  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUT(product: ProductDto): __Observable<ProductDto> {
    return this.updateProductUsingPUTResponse(product).pipe(
      __map(_r => _r.body as ProductDto)
    );
  }

  /**
   * getProductById
   * @param id id
   * @return OK
   */
  getProductByIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<ProductDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDto>;
      })
    );
  }
  /**
   * getProductById
   * @param id id
   * @return OK
   */
  getProductByIdUsingGET(id: string): __Observable<ProductDto> {
    return this.getProductByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductDto)
    );
  }
}

module ProductControllerService {
}

export { ProductControllerService }
