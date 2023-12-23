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
  isMarkUserClicked = false;
  usersForm!: FormGroup;
  public userIdToUpdate!: number;
  useraccesses: string[] = ["Read Only", "Full Access", "No Access"];

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      userid: [''],
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
            this.fillFormToUpdate(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  fillFormToUpdate(user: User) {
    this.usersForm.setValue({
      userid: user.userid,
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

  markNewUser() {
    this.isMarkUserClicked = true;
  }
}