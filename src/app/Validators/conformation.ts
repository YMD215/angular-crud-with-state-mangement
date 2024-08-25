import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, Validator } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class Conformation implements Validator{
    validate(control: AbstractControl): ValidationErrors | null {
        if((control as FormGroup).get('password')?.value == (control as FormGroup).get('confirmation')?.value){
            return null
        }
        return { confirmation: true }
    }
    constructor(){}
}
