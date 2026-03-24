import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PreAuthService } from '../../Services/pre-auth-service';
import { Router, RouterLink } from '@angular/router';
import { PostAuthService } from '../../Services/post-auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  empData: any[] = [];
  constructor(
    private loginService: PreAuthService,
    private postAuth: PostAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  getData() {
    this.postAuth.getEmpData().subscribe((res: any) => {
      this.empData = res;
      this.cdr.detectChanges();
    });
  }
}
