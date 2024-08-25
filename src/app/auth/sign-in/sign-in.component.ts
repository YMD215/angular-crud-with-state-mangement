import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private service: AuthService , private router: Router){}
  authForm = new FormGroup({
    username: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z_0-9.]+$/i)
      ]
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  })
  getControl(item: string){
    return this.authForm.get(item) as FormControl
  }

}
