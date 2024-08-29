import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, switchMap, tap } from 'rxjs';
import { UserListComponent } from './user-list/user-list.component';
import { Table } from 'primeng/table';

export interface IUser {
  name: string
  email: string
  address: string
  id?: string | number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users!: IUser[]
  constructor(private http: HttpClient) {}
  api = 'http://localhost:3000/empolyees/'
  getAllUsers(){
    return this.http.get<IUser[]>(this.api).pipe(
      tap((users) => {
        this.users = users;
      })
    )
  }


  addNewUser(newUser: IUser) {
    return of(this.users).pipe(
      map(users => {
        const existingUser = users.find(user => user.name === newUser.name && user.email === newUser.email);
        return !existingUser;
      }),
      switchMap(canAddUser => {
        if (canAddUser) {
          return this.http.post<IUser>(this.api, newUser);
        } else {
          return of(false);
        }
      })
    );
  } 
  editUser(User: IUser){
    return this.http.put(this.api + User.id , User)
  }
  
  
  // Optionaly if youssef maype wants it 
  // deleteAllUsers() {
  //   this.http.get<any[]>('http://localhost:3000/employees').subscribe(users => {
  //     const deleteRequests = users.map(user =>
  //       this.http.delete(`http://localhost:3000/employees/${user.id}`)
  //     );
  //     forkJoin(deleteRequests).subscribe(() => {
  //       console.log('All users have been deleted');
  //     });
  //   });
  // }
  removeUser(id: any){
    console.log(id);
    return this.http.delete(this.api + `${id}`)
  } 
}
