import { Subscription } from '../models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-subscription-form',
  templateUrl: './edit-subscription-form.component.html',
  styleUrls: ['./edit-subscription-form.component.scss']
})
export class EditSubscriptionFormComponent implements OnInit {

  subscriptionForm!: FormGroup;
  public subscriptionIdToUpdate!: number;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      subscriptionid: [''],
      subscription: [''],
      duration: [''],
      amount: [''],
      status: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.subscriptionIdToUpdate = val['id'];
      this.service.getSubscriptionId(this.subscriptionIdToUpdate)
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
  
  fillFormToUpdate(subscription: Subscription) {
    this.subscriptionForm.setValue({
      subscriptionid: subscription.subscriptionid,
      subscription: subscription.subscription,
      duration: subscription.duration,
      amount: subscription.amount,
      status: subscription.status
    })
  }

  update() {
    this.service.updateSubscription(this.subscriptionForm.value, this.subscriptionIdToUpdate)
      .subscribe(res => {
        this.toastr.success('Update Successfully');
        this.router.navigate(['subscription']);
        this.subscriptionForm.reset();
      });
  }
}
