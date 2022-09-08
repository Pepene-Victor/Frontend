/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Product } from '../models/product';

/**
 * Product Controller
 */
@Injectable({
  providedIn: 'root',
})
class ProductControllerService extends __BaseService {
  static readonly getAllProductsUsingGETPath = '/products';
  static readonly createProductUsingPOSTPath = '/products/create';
  static readonly deleteProductUsingDELETEPath = '/products/delete/{id}';
  static readonly getProductByProductNameUsingGETPath = '/products/productName';
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
  getAllProductsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Product>>> {
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
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * getAllProducts
   * @return OK
   */
  getAllProductsUsingGET(): __Observable<Array<Product>> {
    return this.getAllProductsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOSTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
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
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOST(product: Product): __Observable<Product> {
    return this.createProductUsingPOSTResponse(product).pipe(
      __map(_r => _r.body as Product)
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
   * getProductByProductName
   * @param productName productName
   * @return OK
   */
  getProductByProductNameUsingGETResponse(productName: string): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productName != null) __params = __params.set('productName', productName.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products/productName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * getProductByProductName
   * @param productName productName
   * @return OK
   */
  getProductByProductNameUsingGET(productName: string): __Observable<Array<Product>> {
    return this.getProductByProductNameUsingGETResponse(productName).pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
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
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUT(product: Product): __Observable<Product> {
    return this.updateProductUsingPUTResponse(product).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * getProductById
   * @param id id
   * @return OK
   */
  getProductByIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Product>> {
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
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * getProductById
   * @param id id
   * @return OK
   */
  getProductByIdUsingGET(id: string): __Observable<Product> {
    return this.getProductByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Product)
    );
  }
}

module ProductControllerService {
}

export { ProductControllerService }
