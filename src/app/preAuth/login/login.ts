import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PreAuthService } from '../../Services/pre-auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: PreAuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  onSubmit() {
    const formData = this.loginForm.value;
    this.loginService.login(formData).subscribe({
      next: (res) => {
        alert(`Login Successfull. ${formData.email + ' ' + formData.mobile}`);
      },

      error: (err) => {
        alert(`An error occurred: ${err}`);
      },
    });
  }
}
