import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = 'name'
  @Input() control!: FormControl
  @Input() type!: string
  @Input() controlType: string = 'input'

  showError(){
    return this.control.dirty && this.control.touched && this.control.errors;
  }
  UnderScore = true
  show(){
    let input: string = this.control.value
    let reg = /_/
    if(reg.test(input)){
      console.log(input)
      this.UnderScore = true
    }
    else{
      this.UnderScore = false
    }
  }
}
