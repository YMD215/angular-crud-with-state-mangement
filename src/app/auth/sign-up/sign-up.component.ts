import { Component, ViewChild } from '@angular/core';
import { InputComponent } from "../../shared/input/input.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ILoginUser } from '../auth.service';
import { Conformation } from '../../shared/Validators/conformation';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ProgressSpinnerModule , CommonModule],
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

  signingUp$ = new BehaviorSubject<boolean | null>(false);
  onSubmit(){
    this.signingUp$.next(null);
    let password: string | null = this.authForm.value.password!
    let username: string | null = this.authForm.value.username!
    if(this.authForm.valid){
        this.submitService.submitUser({username , password}).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/users');
            console.log(response)
            this.formGroupDirective.resetForm()
            this.signingUp$.next(true);
          },
          error: (error) => {
            this.formGroupDirective.resetForm(this.authForm.value)
            this.signingUp$.next(false);
            if(error?.status){
              this.authForm.setErrors( {networkIsBad: true} )          
            }
            else{
              this.authForm.setErrors( {AllreadyHaveAccount: true} )
            }
          }
        })
      }
      // else{
      //   this.formGroupDirective.resetForm(this.authForm.value)
      //   this.signingUp$.next(false);
      //   this.authForm.setErrors( {AllreadyHaveAccount: true} )
      // }
  }

  getControl(item: string){
    let control = this.authForm.get(item) as FormControl<string | null>
    return control
  }
  showError(){
    return this.authForm.controls.password.dirty &&  this.authForm.controls.confirmation.dirty && this.authForm.controls.password.touched && this.authForm.errors?.['confirmation']
  }

  ngOnDestroy(): void {
    this.submitService.signUpData = this.authForm.value
    console.log(this.submitService.signUpData);
  }
  ngAfterContentInit(): void {
      this.authForm.get('username')?.setValue(this.submitService.signUpData?.username!);    
      this.authForm.get('password')?.setValue(this.submitService.signUpData?.password!);    
      this.authForm.get('confirmation')?.setValue(this.submitService.signUpData?.confirmation!);    
  }

}
