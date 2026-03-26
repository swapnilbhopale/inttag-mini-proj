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
  tempData: any[] = []
  constructor(
    private loginService: PreAuthService,
    private postAuth: PostAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

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
      this.tempData = this.empData
    });
  }

  deleteData(email: string) {
    this.postAuth.deleteEmpData(email).subscribe({
      next: () => {
        alert('Employee Deleted successfully');
        this.getData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  searchData(data: string) {
    const searchText = data.toLowerCase()

    this.empData = this.tempData.filter(data =>
      data.name.toLowerCase().includes(searchText) ||
      data.email.toLowerCase().includes(searchText) ||
      data.designation.toLowerCase().includes(searchText) ||
      data.phone.includes(searchText) ||
      data.address.toLowerCase().includes(searchText)
    )
  }
}
