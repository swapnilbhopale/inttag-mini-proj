import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreAuthService } from '../../Services/pre-auth-service';
import { RouterLink } from '@angular/router';
import { OnlyAlphabets } from '../../Directives/only-alphabets';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, OnlyAlphabets],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: PreAuthService,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.registerForm.value;
    this.loginService.register(formData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.registerForm.reset();
      },

      error: (err) => {
        alert(`An error occurred: ${err}`);
      },
    });
  }
}
