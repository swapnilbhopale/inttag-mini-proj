import { Component } from '@angular/core';
import { PreAuthService } from '../../Services/pre-auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  constructor(
    private loginService: PreAuthService,
    private router: Router,
  ) {}
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
