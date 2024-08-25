import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);
  rotuer = inject(Router);
  isLoggedIn$: BehaviorSubject<boolean | null> = this.authService.subject$

  ngOnInit(): void {
    this.authService.checkAuth().subscribe((res) => {
      if(res){
        this.rotuer.navigateByUrl('/users');
      }
      console.log('authintecated: ' + res);
      
    })    
  }
}
