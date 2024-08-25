import { Component, ViewChild } from '@angular/core';
import { InputComponent } from "../../input/input.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Conformation } from '../../Validators/conformation';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private submitService: AuthService , 
    private router: Router,
    private conformation: Conformation
    ){}
  authForm = new FormGroup({
    username: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/\w+/i)
      ],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  }, [this.conformation.validate])

  onSubmit(){
    if(this.authForm.valid){
      let passwordConfirmation : string | null = this.authForm.value.confirmation!
      let password: string | null = this.authForm.value.password!
      let username: string | null = this.authForm.value.username!
      this.submitService.submitUser({username , password , passwordConfirmation}).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/users');
          console.log(response)
          this.authForm.reset()
        },
        error: (error) => {
          if (!error.stats){
            console.error(error)
            this.authForm.setErrors( {networkIsBad: true} )
            this.formGroupDirective.resetForm(this.authForm.value)
          }
          if (error.stats){
            console.error(error)
            this.authForm.setErrors( {FailedToSignUp: true} )
            this.formGroupDirective.resetForm(this.authForm.value)
         }
        }
      })
    }
  }

  getControl(item: string){
    let control = this.authForm.get(item) as FormControl<string | null>
    return control
  }
  showError(){
    return this.authForm.controls.password.dirty &&  this.authForm.controls.confirmation.dirty && this.authForm.controls.password.touched && this.authForm.errors?.['confirmation']
  }
}
