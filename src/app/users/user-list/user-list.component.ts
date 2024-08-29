import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../../shared/table/table.component';
import { IUser, UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ModalComponent, UserFormComponent, ButtonModule, TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  constructor(private userService: UsersService){}  
  headerTitle = 'Add New User !!';
  showModal = false;
  userForm!: IUser
  users: IUser[] = []
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    })    
  }

  AddUser(){
    this.showModal = true;
    console.log('added');
  }
  submit(user: any){
    if(user == false) return;
    this.showModal = false;
    console.log(user);
    console.log('submited');
    if(!this.userForm){
      this.users = [...this.users, user];
    }
    else{
      let userIndex = this.users.findIndex((user) => user.id == this.userForm.id)
      console.log(userIndex);
      let newArr = this.users
      newArr[userIndex] = user;
      this.users = [...newArr]
      console.log(this.users);
    }
  }
  deleteUser(id: string){
    this.userService.removeUser(id).subscribe((res: any) => {
      console.log(res);
      this.users = this.users.filter(user => user.id !== id);
      this.userService.users = this.userService.users.filter(user => user.id !== id);
    })
  }
  EditUser(user: IUser){
    console.log('edit');
    
    this.showModal = true;
    this.userForm = user;
    this.headerTitle = 'Edit User !!';
  }
}
