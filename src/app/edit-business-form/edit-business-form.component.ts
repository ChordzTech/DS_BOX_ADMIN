import { Business } from '../models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';

@Component({ 
  selector: 'app-edit-business-form',
  templateUrl: './edit-business-form.component.html',
  styleUrls: ['./edit-business-form.component.scss']
})
export class EditBusinessFormComponent implements OnInit {

  businessForm!: FormGroup;
  public businessIdToUpdate!: number;
  subscriptions: string[] = ["Monthly - 149 Rs.", "Yearly Single User - 999 Rs.", "Yearly Multiuser - 1799 Rs."];

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      businessid: [''],
      businessname: [''],
      address: [''],
      pincode: [''],
      contactno: [''],
      email: [''],
      geolocation: [''],
      marginlength: [''],
      marginwidth: [''],
      burstingfactor: [''],
      gsm: [''],
      rate: [''],
      flutefactor: [''],
      waste: [''],
      conversionrate: [''],
      profit: [''],
      tax: [''],
      estimatenote: [''],
      activationdate: [''],
      subscriptiondate: [''],
      multiuser: [''],
      status: [''],
      // subscription:[''],
      // transaction:['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.businessIdToUpdate = val['id'];
      this.service.getBusinessId(this.businessIdToUpdate)
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

  fillFormToUpdate(business: Business) {
    this.businessForm.setValue({
      businessid: business.businessid,
      businessname: business.businessname,
      address: business.address,
      pincode: business.pincode,
      contactno: business.contactno,
      email: business.email,
      geolocation: business.geolocation,
      marginlength: business.marginlength,
      marginwidth: business.marginwidth,
      burstingfactor: business.burstingfactor,
      gsm: business.gsm,
      rate: business.rate,
      flutefactor: business.flutefactor,
      waste: business.waste,
      conversionrate: business.conversionrate,
      profit: business.profit,
      tax: business.tax,
      estimatenote: business.estimatenote,
      activationdate: business.activationdate,
      subscriptiondate: business.subscriptiondate,
      multiuser: business.multiuser,
      status: business.status,
      // subscription:business.subscription,
      // transaction:business.transaction
    })
  }

  update() {
    this.service.updateBusiness(this.businessForm.value, this.businessIdToUpdate)
      .subscribe(res => {
        alert("Update Successfully...");
        this.router.navigate(['business']);
        this.businessForm.reset();
      });
  }
}