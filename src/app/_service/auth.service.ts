import { User } from './../_model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public url: string = 'http://127.0.0.1:8082/';


  constructor(private http: HttpClient) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('demojwt-client:demojwt-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    } 
    return this.http.post(`${this.url}oauth/token`, loginPayload, {headers});
  }
  
  onGetToken() {
    return JSON.parse(sessionStorage.getItem('token')).access_token;
  }

  onRefreshToken() {
    const headers = {
      'Authorization': 'Basic ' + btoa('demojwt-client:demojwt-secret'),
      'Content-type': 'application/json'
    }
    const refreshToken = JSON.parse(sessionStorage.getItem('token')).refresh_token
    return this.http.post(`${this.url}oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, {} , {headers});
  }

}
