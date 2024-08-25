import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';

export interface IUser{
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}
export interface IUserRes{
    name: string;
    job: string;
    id: string;
    createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject$ = new  BehaviorSubject<boolean | null>(null)
  constructor(private http: HttpClient) { }
  url = "https://api.angular-email.com/"
  api = "https://reqres.in/api/"
  username = '';
  submitUser(value: IUser){
    return this.http.post<IUserRes>(this.api + 'users' , {
      value
    }).pipe(
      tap(() => {
        this.subject$.next(true);
        localStorage.setItem('signIn', 'true')
      })
    )
  }
  checkAuth(){
    this.subject$.next(JSON.parse(localStorage.getItem('signIn')!))
    return of(localStorage.getItem('signIn') == 'true');
  }

  signOut(){
    return this.http.post(this.url + 'auth/signout', {}).pipe(
      tap(() => {
        this.subject$.next(false)
      })
    )
  }

  signIn(value: any){
    return this.http.post<{username: string}>(this.url + 'auth/signin', value).pipe(
      tap(({ username }) => {
        this.subject$.next(true);
        this.username = username;
      })
    )
  }

}
