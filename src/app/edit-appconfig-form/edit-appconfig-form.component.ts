import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-edit-appconfig-form',
  templateUrl: './edit-appconfig-form.component.html',
  styleUrls: ['./edit-appconfig-form.component.scss']
})
export class EditAppconfigFormComponent {

  editAppConfigForm = this.builder.group({ 
    configuration: this.builder.control('', Validators.required),
    value: this.builder.control('', Validators.required),
  });

    
  constructor(private builder: FormBuilder, private service: ServiceService) {
  }

  updateAppConfigDetails() {
    console.log(this.editAppConfigForm.value)

  }

}
