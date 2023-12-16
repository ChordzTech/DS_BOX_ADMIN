import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changepasswordForm = this.builder.group({
    oldPassword: this.builder.control('', Validators.required),
    newPassword: this.builder.control('', Validators.required),
    retypeNewPassword: this.builder.control('', Validators.required),
    // status: this.builder.control(''),
  });


  constructor(private builder: FormBuilder, private service: ServiceService) {
  }

  changePassword() {
    console.log(this.changepasswordForm.value)

  }


}
