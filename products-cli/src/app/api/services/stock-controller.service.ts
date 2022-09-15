/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { StockDto } from '../models/stock-dto';

/**
 * Stock Controller
 */
@Injectable({
  providedIn: 'root',
})
class StockControllerService extends __BaseService {
  static readonly getAllStocksUsingGETPath = '/stocks';
  static readonly createStockUsingPOSTPath = '/stocks/create/productId';
  static readonly getStockByProductIdUsingGETPath = '/stocks/productId';
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
  getAllStocksUsingGETResponse(): __Observable<__StrictHttpResponse<Array<StockDto>>> {
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
        return _r as __StrictHttpResponse<Array<StockDto>>;
      })
    );
  }
  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGET(): __Observable<Array<StockDto>> {
    return this.getAllStocksUsingGETResponse().pipe(
      __map(_r => _r.body as Array<StockDto>)
    );
  }

  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stockDto`: stockDto
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOSTResponse(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<__StrictHttpResponse<StockDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.stockDto;
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
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stockDto`: stockDto
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOST(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<StockDto> {
    return this.createStockUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as StockDto)
    );
  }

  /**
   * getStockByProductId
   * @param productId productId
   * @return OK
   */
  getStockByProductIdUsingGETResponse(productId: string): __Observable<__StrictHttpResponse<StockDto>> {
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
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * getStockByProductId
   * @param productId productId
   * @return OK
   */
  getStockByProductIdUsingGET(productId: string): __Observable<StockDto> {
    return this.getStockByProductIdUsingGETResponse(productId).pipe(
      __map(_r => _r.body as StockDto)
    );
  }

  /**
   * updateStock
   * @param stockDto stockDto
   * @return OK
   */
  updateStockUsingPUTResponse(stockDto: StockDto): __Observable<__StrictHttpResponse<StockDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stockDto;
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
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * updateStock
   * @param stockDto stockDto
   * @return OK
   */
  updateStockUsingPUT(stockDto: StockDto): __Observable<StockDto> {
    return this.updateStockUsingPUTResponse(stockDto).pipe(
      __map(_r => _r.body as StockDto)
    );
  }
}

module StockControllerService {

  /**
   * Parameters for createStockUsingPOST
   */
  export interface CreateStockUsingPOSTParams {

    /**
     * stockDto
     */
    stockDto: StockDto;

    /**
     * productId
     */
    productId: string;
  }
}

export { StockControllerService }
