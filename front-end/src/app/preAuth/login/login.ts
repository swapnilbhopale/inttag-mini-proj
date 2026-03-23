import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PreAuthService } from '../../Services/pre-auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: PreAuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['chetan@gmail.com', Validators.required],
      password: ['12345', Validators.required],
    });
  }
  onSubmit() {
    const formData = this.loginForm.value;
    this.loginService.login(formData).subscribe({
      next: (res: any) => {
        this.loginForm.reset();
        this.loginService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        alert(`An error occurred: ${err.message}`);
      },
    });
  }
}
