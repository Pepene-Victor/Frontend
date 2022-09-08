/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Stock } from '../models/stock';

/**
 * Stock Controller
 */
@Injectable({
  providedIn: 'root',
})
class StockControllerService extends __BaseService {
  static readonly getAllStocksUsingGETPath = '/stocks';
  static readonly createStockUsingPOST1Path = '/stocks/create';
  static readonly createStockUsingPOSTPath = '/stocks/create/productId';
  static readonly getStockByProductIdUsingGETPath = '/stocks/productId';
  static readonly getStockByProductNameUsingGETPath = '/stocks/productName';
  static readonly updateStockUsingPUTPath = '/stocks/update';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Stock>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stocks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Stock>>;
      })
    );
  }
  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGET(): __Observable<Array<Stock>> {
    return this.getAllStocksUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Stock>)
    );
  }

  /**
   * createStock
   * @param stock stock
   * @return OK
   */
  createStockUsingPOST1Response(stock: Stock): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stock;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/stocks/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * createStock
   * @param stock stock
   * @return OK
   */
  createStockUsingPOST1(stock: Stock): __Observable<Stock> {
    return this.createStockUsingPOST1Response(stock).pipe(
      __map(_r => _r.body as Stock)
    );
  }

  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stock`: stock
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOSTResponse(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.stock;
    if (params.productId != null) __params = __params.set('productId', params.productId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/stocks/create/productId`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stock`: stock
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOST(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<Stock> {
    return this.createStockUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as Stock)
    );
  }

  /**
   * getStockByProductId
   * @param productId productId
   * @return OK
   */
  getStockByProductIdUsingGETResponse(productId: string): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productId != null) __params = __params.set('productId', productId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stocks/productId`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * getStockByProductId
   * @param productId productId
   * @return OK
   */
  getStockByProductIdUsingGET(productId: string): __Observable<Stock> {
    return this.getStockByProductIdUsingGETResponse(productId).pipe(
      __map(_r => _r.body as Stock)
    );
  }

  /**
   * getStockByProductName
   * @param productName productName
   * @return OK
   */
  getStockByProductNameUsingGETResponse(productName: string): __Observable<__StrictHttpResponse<Array<Stock>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productName != null) __params = __params.set('productName', productName.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stocks/productName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Stock>>;
      })
    );
  }
  /**
   * getStockByProductName
   * @param productName productName
   * @return OK
   */
  getStockByProductNameUsingGET(productName: string): __Observable<Array<Stock>> {
    return this.getStockByProductNameUsingGETResponse(productName).pipe(
      __map(_r => _r.body as Array<Stock>)
    );
  }

  /**
   * updateStock
   * @param stock stock
   * @return OK
   */
  updateStockUsingPUTResponse(stock: Stock): __Observable<__StrictHttpResponse<Stock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stock;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/stocks/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Stock>;
      })
    );
  }
  /**
   * updateStock
   * @param stock stock
   * @return OK
   */
  updateStockUsingPUT(stock: Stock): __Observable<Stock> {
    return this.updateStockUsingPUTResponse(stock).pipe(
      __map(_r => _r.body as Stock)
    );
  }
}

module StockControllerService {

  /**
   * Parameters for createStockUsingPOST
   */
  export interface CreateStockUsingPOSTParams {

    /**
     * stock
     */
    stock: Stock;

    /**
     * productId
     */
    productId: string;
  }
}

export { StockControllerService }
