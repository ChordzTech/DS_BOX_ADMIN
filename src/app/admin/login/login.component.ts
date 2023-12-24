import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),

    password: this.builder.control('', Validators.required),
    // password: this.builder.control('',
    //   Validators.compose([Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])),
  });

  login() {
    if (this.loginForm.valid) {
      this.service.getById(this.loginForm.value.username).subscribe((res: any) => {
        this.userData = res;
        console.log(this.userData);
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id)
            this.router.navigateByUrl('/home')
          } else {
            alert('Please contact to Admin!!!')
          } 
        } else {
          this.toastr.error('Invalid Credential!!!')
        }
      })
    } else {
      this.toastr.error('Please Enter Valid Data')

    }
  }
}
