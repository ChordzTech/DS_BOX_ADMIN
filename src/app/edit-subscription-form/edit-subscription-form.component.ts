import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-edit-subscription-form',
  templateUrl: './edit-subscription-form.component.html',
  styleUrls: ['./edit-subscription-form.component.scss']
})
export class EditSubscriptionFormComponent {

  editSubscriptionForm = this.builder.group({ 
    businessname: this.builder.control('', Validators.required),
    contactno: this.builder.control('', Validators.required),
    subscriptiondate: this.builder.control('', Validators.required),
    subscription: this.builder.control('', Validators.required),
    useraccess: this.builder.control('', Validators.required),
    androidId: this.builder.control('', Validators.required),
    deviceInfo: this.builder.control('', Validators.required),
    status: this.builder.control(false),
  });

    
  constructor(private builder: FormBuilder, private service: ServiceService) {
  }

  updateSubscrioptionDetails() {
    console.log(this.editSubscriptionForm.value)

  }

}
