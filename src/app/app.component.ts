import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule , ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn$: BehaviorSubject<boolean | null>
  constructor(private authService: AuthService){
    this.isLoggedIn$ = this.authService.subject$
  }
  rotuer = inject(Router);

  ngOnInit(): void {
    this.authService.checkAuth().subscribe((res) => {
      if(res){
        this.rotuer.navigateByUrl('/users');
      }
      console.log('authintecated: ' + res);
    }) 
  }
}
