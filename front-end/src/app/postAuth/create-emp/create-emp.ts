import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostAuthService } from '../../Services/post-auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-emp',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-emp.html',
  styleUrl: './create-emp.scss',
})
export class CreateEmp implements OnInit {
  employeeForm!: FormGroup;
  buttonText: string = 'Register';

  constructor(
    private fb: FormBuilder,
    private postAuth: PostAuthService,
    private router: Router,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.changedText();
  }

  updateForm() {
    const empData = history.state.data;
    if (empData) {
      this.employeeForm.patchValue({
        name: empData.name,
        designation: empData.designation,
        email: empData.email,
        phone: empData.phone,
        address: empData.address,
      });
    }
  }

  changedText() {
    if (this.router.url.includes('/update-emp')) {
      this.buttonText = 'Update';
      this.updateForm();
    }
  }

  onSubmit() {
    const formData = this.employeeForm.value;
    if (this.buttonText === 'Register')
      this.postAuth.postEmpData(formData).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.employeeForm.reset();
        },

        error: (res: any) => {
          alert(`An error occurred: ${res.error.message}`);
        },
      });
    else {
      this.postAuth.updateEmpData(formData).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/create-emp']);
        },
        error: (res) => {
          alert(`An error occurred: ${res.message}`);
        },
      });
    }
  }
}
