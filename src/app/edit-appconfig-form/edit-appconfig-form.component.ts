import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';
import { appConfig, myimages } from '../models';
import { Observable, Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-appconfig-form',
  templateUrl: './edit-appconfig-form.component.html',
  styleUrls: ['./edit-appconfig-form.component.scss'] 
})
export class EditAppconfigFormComponent {

  appConfigForm!: FormGroup;
  public configIdToUpdate!: number;
  myImage1!: Observable<any>;
  base64code!: any;

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.appConfigForm = this.fb.group({
      configid: [''],
      configname: [''],
      configvalue: [''],
      base64_code: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.configIdToUpdate = val['id'];
      this.service.getappConfigId(this.configIdToUpdate)
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

  fillFormToUpdate(appconfig: appConfig) {
    this.appConfigForm.setValue({
      configid: appconfig.configid,
      configname: appconfig.configname,
      configvalue: appconfig.configvalue,
      base64_code: myimages,
    });
  }

  update() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        // const base64Content = base64String.split(',')[1];
        this.service.postImage(base64String).subscribe(
          ((response: any) => {
            console.log('Image uploaded successfully:', response);
          }),
          ((error: any) => {
            console.error('Error uploading image:', error);
          })
        );
      };

      reader.readAsDataURL(this.selectedFile);
    }

    this.service.updateappConfig(this.appConfigForm.value, this.configIdToUpdate)    // , this.base64code)
      .subscribe(res => {
        this.toastr.success('Update Successfully');
        this.router.navigate(['appConfig']);
        this.appConfigForm.reset();
      });
  }

}
