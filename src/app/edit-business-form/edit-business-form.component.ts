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
  // public transaction!: TransactionDetails[];

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
      this.businessIdToUpdate = +params['id'];
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
    
      // Fetch transaction details
      this.service.getTransactionDetailsByBusinessId(this.businessIdToUpdate, this.transactionIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate1(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        });
    });
  }    

    // this.getTransactionList();

  //   this.activatedRoute.params.subscribe(val => {
  //     this.businessIdToUpdate = val['id'];
  //     this.service.getBusinessId(this.businessIdToUpdate)
  //       .subscribe({
  //         next: (res) => {
  //           this.fillFormToUpdate(res.data);
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       })
  //   });


  //   this.activatedRoute.params.subscribe(val => {
  //     this.transactionIdToUpdate = val['id'];
  //     this.service.getTransactionDetailsByBusinessId(this.businessIdToUpdate, this.transactionIdToUpdate)
  //       .subscribe({
  //         next: (res) => {
  //           this.fillFormToUpdate1(res.data);
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       })
  //   })
  // }



  //   this.activatedRoute.params.subscribe(params => {
  //     this.businessIdToUpdate = +params['id'];
  //     this.fetchBusinessAndTransactionData();
  //   });
  // }

  // fetchBusinessAndTransactionData(): void {
  //   this.service.getBusinessId(this.businessIdToUpdate).subscribe({
  //     next: (res) => {
  //       this.fillFormToUpdate(res.data);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching business data', err);
  //     }
  //   });

  //   this.service.getTransactionDetailsByBusinessId(this.businessIdToUpdate).subscribe({
  //     next: (transactionDetailsList) => {
  //       if (transactionDetailsList.length > 0) {
  //         const firstTransactionDetail = transactionDetailsList[0];
  //         this.fillFormToUpdate1(firstTransactionDetail);
  //       } else {
  //         console.log("No transaction details found for the business ID");
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching transaction details', err);
  //     }
  //   });
  // }

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

  fillFormToUpdate1(transaction: TransactionDetails): void {
    this.transactionForm.setValue({
      transactionid: transaction.transactionid,
      businessid: transaction.businessid,
      transactiondate: transaction.transactiondate,
      duration: transaction.duration,
      amount: transaction.amount,
      perticulars: transaction.perticulars,
      status: transaction.status
    });
  }


  update() {
    this.service.updateTransaction(this.transactionForm.value, this.businessIdToUpdate, this.transactionForm.value.transactionid)
      .subscribe(res => {
        this.toastr.success('Update Successfully');
        this.router.navigate(['business']);
      });
  }
  

  // update(): void {
  //   this.service.updateTransaction(this.transactionForm.value, this.businessIdToUpdate).subscribe(
  //     (res) => {
  //       this.toastr.success('Update Successfully');
  //       this.router.navigate(['business']);
  //       this.businessForm.reset();
  //     },
  //     (error) => {
  //       console.error('Error updating transaction', error);
  //       this.toastr.error('Failed to update transaction');
  //     }
  //   );
  // }
}
