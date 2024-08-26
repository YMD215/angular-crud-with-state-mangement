import { Injectable } from '@angular/core';
import { IUserRes } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  api = "https://reqres.in/api/"
  getAllUsers(){
    return this.http.get<IUserRes[]>(this.api + 'users')
  }
}
