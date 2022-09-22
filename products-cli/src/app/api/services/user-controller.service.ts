/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import {BehaviorSubject, Observable as __Observable} from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { User } from '../models/user';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly getUserByUsernameUsingGETPath = '/user/account-details';
  static readonly registerUserUsingPOSTPath = '/user/register';
  static readonly updateUserEmailUsingPUTPath = '/user/update-account-email';
  static readonly updateUserPasswordUsingPUTPath = '/user/update-account-password';
  static readonly updateUserNameUsingPUTPath = '/user/update-account-username';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  getAccountDetailsType(){
    let accountDetailsType = sessionStorage.getItem("accountDetailsType")
    if(!!accountDetailsType){
      return JSON.parse(accountDetailsType);
    }
  }
  setAccountDetailsType(accountDetailsType: string){
    sessionStorage.setItem("accountDetailsType", JSON.stringify(accountDetailsType));
  }

  getLoggedAccountUsername(){
    let loggedAccountUsername = sessionStorage.getItem("username");
    if(!!loggedAccountUsername) {
      return JSON.parse(loggedAccountUsername);
    }
  }

  setLoggedAccountUsername(loggedAccountUsername: string){
    sessionStorage.setItem("username", JSON.stringify(loggedAccountUsername));
  }

  getIsUserLoggedStatus(){
    let isUserLogged = sessionStorage.getItem("isUserLogged");
    if(!!isUserLogged) {
      return JSON.parse(isUserLogged);
    }
  }

  setIsUserLoggedStatus(isUserLogged: boolean){
    sessionStorage.setItem("isUserLogged", JSON.stringify(isUserLogged));
  }

  /**
   * getUserByUsername
   * @param username username
   * @return OK
   */
  getUserByUsernameUsingGETResponse(username: string): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (username != null) __params = __params.set('username', username.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/account-details`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * getUserByUsername
   * @param username username
   * @return OK
   */
  getUserByUsernameUsingGET(username: string): __Observable<User> {
    return this.getUserByUsernameUsingGETResponse(username).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * registerUser
   * @param user user
   * @return OK
   */
  registerUserUsingPOSTResponse(user: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/user/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * registerUser
   * @param user user
   * @return OK
   */
  registerUserUsingPOST(user: User): __Observable<User> {
    return this.registerUserUsingPOSTResponse(user).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * updateUserEmail
   * @param user user
   * @return OK
   */
  updateUserEmailUsingPUTResponse(user: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/user/update-account-email`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * updateUserEmail
   * @param user user
   * @return OK
   */
  updateUserEmailUsingPUT(user: User): __Observable<User> {
    return this.updateUserEmailUsingPUTResponse(user).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * updateUserPassword
   * @param user user
   * @return OK
   */
  updateUserPasswordUsingPUTResponse(user: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/user/update-account-password`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * updateUserPassword
   * @param user user
   * @return OK
   */
  updateUserPasswordUsingPUT(user: User): __Observable<User> {
    return this.updateUserPasswordUsingPUTResponse(user).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * updateUserName
   * @param user user
   * @return OK
   */
  updateUserNameUsingPUTResponse(user: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/user/update-account-username`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * updateUserName
   * @param user user
   * @return OK
   */
  updateUserNameUsingPUT(user: User): __Observable<User> {
    return this.updateUserNameUsingPUTResponse(user).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module UserControllerService {
}

export { UserControllerService }
