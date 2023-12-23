import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../shared/service.service';
import { appConfig } from '../models';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-edit-app-config',
  templateUrl: './edit-app-config.component.html',
  styleUrls: ['./edit-app-config.component.scss']
})
export class EditAppConfigComponent implements OnInit {
  appConfigForm!: FormGroup;
  public configIdToUpdate!: number;

  myImage!: Observable<any>;
  base64code!: any;

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      console.log(d);
      this.myImage = d;
      this.base64code = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.appConfigForm = this.fb.group({
      // id: [''],
      configuration: [''],
      value: ['']
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
      // id: appconfig.id,
      configuration: appconfig.configname,
      value: appconfig.configvalue
    });
  }

  update() {
    this.service.updateappConfig(this.appConfigForm.value, this.configIdToUpdate, this.base64code)
      .subscribe(res => {
        alert("Update Successfully...");
        this.router.navigate(['appConfig']);
        this.appConfigForm.reset();
      });
  }
}
