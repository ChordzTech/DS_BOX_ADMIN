import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-business-form',
  templateUrl: './edit-business-form.component.html',
  styleUrls: ['./edit-business-form.component.scss'] 
})
export class EditBusinessFormComponent implements OnInit {
  businessForm: any;
  editData: any;

  // editBusinessForm = this.builder.group({ 
  //   businessname: this.builder.control('', Validators.required),
  //   contactno: this.builder.control('', Validators.required),
  //   subscriptiondate: this.builder.control('', Validators.required),
  //   subscription: this.builder.control('', Validators.required),
  //   status: this.builder.control(false),
  // });
  


  constructor(private builder: FormBuilder, private service: ServiceService) {
  }
  ngOnInit(): void {
    this.businessForm = this.builder.group({
      businessname: ['', Validators.required],
      contactno: [''], 
      subscriptiondate: [''],
      status: [''],
    });

    if (this.editData) {
      // this.businessForm.controls['businessid'].setValue(this.editData.businessid);
      this.businessForm.controls['businessname'].setValue(this.editData.businessname);
      this.businessForm.controls['contactno'].setValue(this.editData.contactno);
      this.businessForm.controls['subscriptiondate'].setValue(this.editData.subscriptiondate);
      this.businessForm.controls['status'].setValue(this.editData.status);
    }
    console.log(this.editData);
  }






  updateBusinessDetails() {
    console.log(this.businessForm.value)

  }

}
