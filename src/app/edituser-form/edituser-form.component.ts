import { User } from '../models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-edituser-form',
  templateUrl: './edituser-form.component.html',
  styleUrls: ['./edituser-form.component.scss']
})
export class EdituserFormComponent implements OnInit {

  usersForm!: FormGroup;
  public userIdToUpdate!: number;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      id: [''],
      businessid: [''],
      userpassword: [''],
      username: [''],
      mobileno: [''],
      userrole: [''],
      useraccess: [''],
      androidid: [''],
      deviceinfo: [''],
      status: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.service.getUserId(this.userIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  fillFormToUpdate(user: User) {
    this.usersForm.setValue({
      id: user.id,
      businessid: user.businessid,
      userpassword: user.userpassword,
      username: user.username,
      mobileno: user.mobileno,
      userrole: user.userrole,
      useraccess: user.useraccess,
      androidid: user.androidid,
      deviceinfo: user.deviceinfo,
      status: user.status,

    })
  }

  update() {
    this.service.updateUser(this.usersForm.value, this.userIdToUpdate)
      .subscribe(res => {
        alert("Update Successfully...");
        this.router.navigate(['users']);
        this.usersForm.reset();
      });
  }
}