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

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      id: [''],
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
      status: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.businessIdToUpdate = val['id'];
      this.service.getBusinessId(this.businessIdToUpdate)
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

  fillFormToUpdate(business: Business) {
    this.businessForm.setValue({
      id: business.id,
      businessname:business.businessname,
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
      status: business.status
    })
  }

  update() {
    this.service.updateBusiness(this.businessForm.value, this.businessIdToUpdate)
      .subscribe(res => {
        alert("Update Successfully...");
        this.router.navigate(['users']);
        this.businessForm.reset();
      });
  }
}