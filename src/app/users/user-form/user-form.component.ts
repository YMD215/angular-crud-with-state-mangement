import { Component, EventEmitter, inject, input, Input, Output, Signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { IUser, UsersService } from '../users.service';



@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule , InputComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @Output() formSubmit = new EventEmitter();
  @Input() user: IUser | undefined
  userService = inject(UsersService);
  userForm: FormGroup = new FormGroup({
    name: new FormControl('' , Validators.required),
    email: new FormControl('' , [ Validators.email , Validators.required ]),
    address: new FormControl('', Validators.required),
  })     

  ngOnInit(): void {
    console.log('input user: ' + this.user);
    if(this.user){
      this.userForm.patchValue(this.user);
    }
  }
  getControl(item: string){
    let control = this.userForm.get(item) as FormControl<string | null>
    return control
  }
  onSubmit(){
    if(this.userForm.valid && !this.user){
      let user = { ...this.userForm.value } as IUser;
      user.id = `${Math.floor(Math.random() * 10000)}`
      this.userService.addNewUser(user).subscribe((res) => {
        if(res == false){
          this.formGroupDirective.resetForm();
          this.userForm.setErrors({AllreadyExistUser: true})
        }
        else{
          console.log(res);
          this.formSubmit.emit(user);
          this.userService.users = [ ...this.userService.users, user]
        }
      })
    }
    else{
      console.log('editing');
      let user = { ...this.userForm.value } as IUser;
      user.id = this.user?.id
      this.userService.editUser(user).subscribe((res) => {
        console.log(res);
        this.formSubmit.emit(user)
      })
    }
  }
  Reset(){
    this.userForm.reset()
  }
}
