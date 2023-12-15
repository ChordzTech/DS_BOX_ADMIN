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
    subscription: this.builder.control('', Validators.required),
    duration: this.builder.control('', Validators.required),
    amount: this.builder.control('', Validators.required),
    status: this.builder.control(''),
  });


  constructor(private builder: FormBuilder, private service: ServiceService) {
  }

  updateSubscrioptionDetails() {
    console.log(this.editSubscriptionForm.value)

  }

}
