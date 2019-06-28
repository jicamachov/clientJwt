import { User } from './../_model/user';
import { AuthService } from './../_service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public url: string = 'http://127.0.0.1:8082/';
  
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getUsers() {
    return this.http.get(`${this.url}users/list?access_token=${this.auth.onGetToken()}`);
  }

  getUserById(id: string) {
    return this.http.get(`${this.url}users/find/${id}?access_token=${this.auth.onGetToken()}`);
  }

  createUser(user: User){
    return this.http.post(`${this.url}users/add?access_token=${this.auth.onGetToken()}`, user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.url}users/edit/${user.id}?access_token=${this.auth.onGetToken()}`, user);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.url}users/del/${id}?access_token=${this.auth.onGetToken()}`);
  }
}
