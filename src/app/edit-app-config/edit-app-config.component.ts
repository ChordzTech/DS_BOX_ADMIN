import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';
import { appConfig, myimages } from '../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-app-config',
  templateUrl: './edit-app-config.component.html',
  styleUrls: ['./edit-app-config.component.scss']
})
export class EditAppConfigComponent implements OnInit {
  appConfigForm!: FormGroup;
  public configIdToUpdate!: number;
  selectedFile: File | null = null;
  base64Image: string | null = null;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

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
        });
    });
  }

  fillFormToUpdate(appconfig: appConfig) {
    this.appConfigForm.setValue({
      configid: appconfig.configid,
      configname: appconfig.configname,
      configvalue: appconfig.configvalue,
      base64_code: myimages,
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64();
  }

  convertToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getBase64Image() {
    return this.base64Image;
  }

  update() {
    this.service.updateappConfig(this.appConfigForm.value, this.configIdToUpdate)
      .subscribe(res => {
        this.toastr.success('Update Successfully');
        this.router.navigate(['/home/appConfig']);
        this.appConfigForm.reset();
      });

    if (this.selectedFile) {
      this.service.postImage(this.base64Image).subscribe(
        (response => {
          console.log('Image uploaded successfully:', response);

          if (this.appConfigForm.value.configid === 18) {
            this.appConfigForm.patchValue({ configvalue: 'QR Code Image Uploaded' });
          }
        }),
        (error => {
          console.error('Error uploading image:', error);
        })
      );
    }
  }
}
