import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, ILoginUser } from '../auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
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
  
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  submitService = inject(AuthService);
  router = inject(Router);
  signingUp$ = new BehaviorSubject<boolean | null>(false);

  onSubmit(){
    this.signingUp$.next(null);
    let password: string | null = this.authForm.value.password!
    let username: string | null = this.authForm.value.username!
    if(this.authForm.valid){
      this.submitService.signIn({username , password}).subscribe({
        next: (response: ILoginUser) => {
          this.router.navigateByUrl('/users');
          console.log(response)
          console.log('users' + JSON.parse(localStorage.getItem('users')!));
          this.formGroupDirective.resetForm()
          this.signingUp$.next(true);
        },
        error: (error) => {
          this.formGroupDirective.resetForm(this.authForm.value)
          if(error?.status){
            this.authForm.setErrors( {networkIsBad: true} )          
          }
          else{
            this.authForm.setErrors( {FailedToSignIn: true} )
          }
          this.signingUp$.next(false);
        }
      })
    }
  }

  getControl(item: string){
    return this.authForm.get(item) as FormControl
  }

}
