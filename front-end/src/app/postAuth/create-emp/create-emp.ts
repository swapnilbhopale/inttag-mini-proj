import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostAuthService } from '../../Services/post-auth-service';

@Component({
  selector: 'app-create-emp',
  imports: [ReactiveFormsModule],
  templateUrl: './create-emp.html',
  styleUrl: './create-emp.scss',
})
export class CreateEmp {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postAuth: PostAuthService,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.employeeForm.value;
    this.postAuth.postEmpData(formData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.employeeForm.reset();
      },

      error: (res: any) => {
        alert(`An error occurred: ${res.error.message}`);
      },
    });
  }
}
