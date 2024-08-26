import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, retry, switchMap, tap, throwError, timer } from 'rxjs';

export interface ILoginUser{
  username: string | null;
  password: string | null;
}
export interface IUserRes{
    value : ILoginUser
    id: string;
    createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject$ = new  BehaviorSubject<boolean | null>(null)
  constructor(private http: HttpClient) { }
  api = "https://reqres.in/api/"
  username = '';
  submitUser(value: ILoginUser){

    if (this.authenticatedUser(value.username!, value.password!)) {
      return timer(1000).pipe(
        tap(() => {
          console.log('taken!!');
          
        }),
        switchMap(() => {
          return throwError(() => new Error('AllreadyHaveAccount'));
        })
      );
    }

    return this.http.post<IUserRes>(this.api + 'users' , {
      value
    }).pipe(
      delay(2000),
      tap(({value , id}) => {
        this.subject$.next(true);
        localStorage.setItem('signIn', 'true');
        localStorage.setItem('id', id);
        this.addUserToLocalStorage(value);
      }),
    )
  }

  checkAuth(){
    console.log('checking');
    return of(localStorage.getItem('signIn') == 'true').pipe(
      delay(2000),
      tap(() => {
        let check = JSON.parse(localStorage.getItem('signIn')!);
        if(check){
          this.subject$.next(true)
        }
        else{
          this.subject$.next(false)
        }
      })
    );
  }

  signOut(){
    let id = localStorage.getItem('id');
    localStorage.removeItem('id')
    localStorage.removeItem('user')
    localStorage.removeItem('signIn')
    console.log('delete');
    return this.http.delete(this.api + `users/${id}`, {}).pipe(
      delay(2000),
      tap(() => {
        this.subject$.next(false);
      })
    )
  }

  signIn(value: ILoginUser){
    let {username , password} = value
    if (!this.authenticatedUser(username! , password!)){
      return timer(2000).pipe(
        switchMap(() => {
          return throwError(() => new Error('FailedToSignUp'));
        })
      );
    }
    return of(value).pipe(
      delay(2000),
      tap(() => {
        this.subject$.next(true);
      })
    )
  }
  authenticatedUser(username: string, password: string) {    
    const users: ILoginUser[] = JSON.parse(localStorage.getItem('users')!) || [];
    if(Array.isArray(users) && users){
      console.log('checking auth');
      const user = users.find(user => user.username === username && user.password === password);
      if (user){
        return true;
      }
      return false;
    }
    return false;
  }
  addUserToLocalStorage(newUser: ILoginUser) {
    let users: any[] = JSON.parse(localStorage.getItem('users') || '[]'); 
    if (!Array.isArray(users)) {
      users = [];
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
