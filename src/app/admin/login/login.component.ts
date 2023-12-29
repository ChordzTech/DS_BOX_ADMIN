import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userData: any;
  loginForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
    this.loginForm = this.builder.group({
      adminname: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.service.getByCredentials(this.loginForm.value.adminname, this.loginForm.value.password).subscribe(
        (res: any) => {
          console.log('API Response:', res);

          this.userData = res;

          if (!this.userData) {
            this.toastr.error('User not found. Please check your credentials.');
          } else if (this.userData.isActive === undefined || this.userData.isActive) {
            sessionStorage.setItem('adminname', this.userData.adminname);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.error('Access Denied. Please contact Admin.');
          }
        },
        (error) => {
          console.error('API Error:', error);
          this.toastr.error('Error occurred while logging in.');
        }
      );
    } else {
      this.toastr.error('Please Enter Valid Data');
    }
  }
}
