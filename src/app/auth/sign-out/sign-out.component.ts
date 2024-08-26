import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [ProgressSpinnerModule , CommonModule],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent {
  authService = inject(AuthService)
  rotuer = inject(Router);
  ngOnInit(): void {
    this.authService.signOut().subscribe(() => {
      console.log('signed out');
      
      this.rotuer.navigateByUrl('/Auth');
    })    
  }
}
