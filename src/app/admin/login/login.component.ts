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

  login(): void {
    const encryptedPassword = this.authService.encryptPassword(this.adminpassword);

    this.authService.login(this.adminname, encryptedPassword).subscribe(
      (response: any) => {
        if (this.credentialsAreValid(response)) {
          localStorage.setItem('admin', JSON.stringify(response));
          this.router.navigate(['/home/dashboard']);
          this.toastr.success('Login successful', 'Success');
        } else {
          this.toastr.error('Invalid credentials. Please try again.', 'Error');
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.toastr.error('An error occurred. Please try again later.', 'Error');
      }
    );
  }

  private credentialsAreValid(response: any): boolean {
    return response && response.data && response.data.length > 0 &&
      response.data[0].adminname === this.adminname;
      // response.data[0].adminpassword === this.authService.encryptPassword(this.adminpassword);

    // Note: Do not compare passwords here, as the server should handle password verification
  }
}