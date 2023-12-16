import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-business-form',
  templateUrl: './edit-business-form.component.html',
  styleUrls: ['./edit-business-form.component.scss'] 
})
export class EditBusinessFormComponent {
  editBusinessForm = this.builder.group({ 
    businessname: this.builder.control('', Validators.required),
    contactno: this.builder.control('', Validators.required),
    subscriptiondate: this.builder.control('', Validators.required),
    subscription: this.builder.control('', Validators.required),
    status: this.builder.control(false),
  });


  constructor(private builder: FormBuilder, private service: ServiceService) {
  }
 






  updateBusinessDetails() {
    console.log(this.editBusinessForm.value)

  }

}
