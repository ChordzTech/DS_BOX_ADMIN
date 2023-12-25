import { changePassword } from '../models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  public adminIdToUpdate!: number;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      adminid: [''],
      adminname: [''],
      mobileno: [''],
      adminpassword: [''],
      firebaseid: [''],
      fcmtoken: [''],
      deviceinfo: [''],
      status: [''],
      confirmPassword: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.adminIdToUpdate = val['id'];
      this.service.getAdminId(this.adminIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  fillFormToUpdate(changePassword: changePassword) {
    this.changePasswordForm.patchValue({
      adminid: changePassword.adminid,
      adminname: changePassword.adminname,
      mobileno: changePassword.mobileno,
      firebaseid: changePassword.firebaseid,
      fcmtoken: changePassword.fcmtoken,
      deviceinfo: changePassword.deviceinfo,
      status: changePassword.status,
    })
  }

  update() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.value.adminpassword;
      const confirmPassword = this.changePasswordForm.value.confirmPassword;
  
      if (!newPassword || !confirmPassword) {
        alert("Please enter both new password and confirm password.");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
  
      this.service.updateAdminPassword(this.changePasswordForm.value, this.adminIdToUpdate).subscribe(
        (res) => {
          alert('Update Successfully...');
          this.changePasswordForm.reset();
        },
        (error) => {
          console.error('Error updating password', error);
        }
      );
    }
  }
  
}