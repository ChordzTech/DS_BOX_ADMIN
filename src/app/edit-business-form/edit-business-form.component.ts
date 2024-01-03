import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { Business, TransactionDetails } from '../models';

@Component({
  selector: 'app-edit-business-form',
  templateUrl: './edit-business-form.component.html',
  styleUrls: ['./edit-business-form.component.scss']
})
export class EditBusinessFormComponent implements OnInit {

  businessForm!: FormGroup;
  transactionForm!: FormGroup;
  businessIdToUpdate!: number;
  transactionIdToUpdate!: number;  
  subscriptions: string[] = ['Monthly - Rs. 149', 'Yearly Single User - Rs. 999', 'Yearly Multiuser - Rs. 1799'];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

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
    });

    this.transactionForm = this.fb.group({
      transactionid: [''],
      businessid: [''],
      transactiondate: [''],
      duration: [''],
      amount: [''],
      perticulars: [''],
      status: [''],
    });

    this.activatedRoute.params.subscribe(params => {
      this.businessIdToUpdate = +params['businessid'];
      // Fetch business details
      this.service.getBusinessId(this.businessIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        });
        return this.businessIdToUpdate;
    });

    this.transactionForm.get('amount')?.valueChanges.subscribe((newValue) => {
      // Extract the numeric value and update the form control
      const numericValue = this.extractNumericValue(newValue);
      this.transactionForm.get('amount')?.setValue(numericValue, { emitEvent: false });
    });
  }

  extractNumericValue(subscription: string): number {
    const numericValue = parseInt(subscription.match(/\d+/)?.[0] || '0', 10);
    return isNaN(numericValue) ? 0 : numericValue;
  }

  // Function to get the numeric value for ngFor [value] binding
  getNumericValue(subscription: string): number {
    return this.extractNumericValue(subscription);
  }

  fillFormToUpdate(business: Business): void {
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
    });
  }

  update() {
    const businessId = this.businessForm.get('businessid')?.value;
    const amount = this.transactionForm.get('amount')?.value;
    const status = this.transactionForm.get('status')?.value;
  
    this.service.postTransaction(businessId, amount, status)
      .subscribe(res => {
        this.toastr.success('Update Successfully');
        this.router.navigate(['business']);
      });
  }
}
