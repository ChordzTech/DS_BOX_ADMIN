import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: ServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      adminid: [''],
      adminname: [''],
      mobileno: [''],
      // adminpassword: [''],
      firebaseid: [''],
      fcmtoken: [''],
      deviceinfo: [''],
      status: [''],
      oldPassword: ['', Validators.required],
      adminpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('adminpassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.value.newPassword;
      // You can call your user service to update the password
      this.service.changePassword(newPassword).subscribe(
        (response) => {
          console.log('Password changed successfully:', response);
          // Handle success (e.g., show a success message)
        },
        (error) => {
          console.error('Error changing password:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}