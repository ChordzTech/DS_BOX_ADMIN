import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  adminname: string = '';
  adminpassword: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  login() {
    this.authService.login(this.adminname, this.adminpassword)
      .subscribe({
        next: (result: any) => {
          if (result && result.message === 'Valid User') {
            localStorage.setItem('admin', JSON.stringify(result));
            this.router.navigate(['home']);
            this.toastr.success('Login successful!', 'Success');
          } else {
            this.toastr.error('Login failed. Please check your credentials.', 'Error');
          }
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.toastr.error('Invalid credentials. Please check your credentials. ', 'Error');
        }
      });
  }
}