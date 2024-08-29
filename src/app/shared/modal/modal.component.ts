import { Component, ElementRef, EventEmitter, Output, inject } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Output() dismiss = new EventEmitter();
  private el = inject(ElementRef)
  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)    
  }
  ngOnDestroy(): void {
    this.el.nativeElement.remove()
  }
  onDismissClick(){
    this.dismiss.emit()
  }
}
