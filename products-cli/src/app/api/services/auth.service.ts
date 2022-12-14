import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserControllerService} from "./user-controller.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient, private _userService: UserControllerService) { }

  login(uploadData: FormData): Observable<HttpResponse<string>> {
    return this._httpClient.post("http://localhost:8080/login", uploadData,
      { responseType: 'text', observe: 'response', withCredentials: true }) as Observable<HttpResponse<string>>;

  }
  logout(): Observable<HttpResponse<string>>{
    return this._httpClient.post('http://localhost:8080/logout', {},
      {withCredentials: true}) as Observable<HttpResponse<string>>;
  }
}


