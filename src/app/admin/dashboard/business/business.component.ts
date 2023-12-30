import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditBusinessFormComponent } from 'src/app/edit-business-form/edit-business-form.component';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models';
// /// <reference types="lodash" />
// import * as _ from 'lodash';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  displayedColumns: string[] = ['businessid', 'businessname', 'contactno', 'multiuser', 'subscriptiondate', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  statusList = ['Active', 'Trial', 'Expired'];
  apiResponse: any[] | undefined;
  subscriptionData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialog: any;

  constructor(private service: ServiceService, private router: Router) { }


  ngOnInit(): void {
    this.getBusinessList();
    this.loadSubscriptionData();
  }

  loadSubscriptionData(): void {
    this.service.getAllBusiuness().subscribe((data: any[]) => {
      this.subscriptionData = data.map(item => {
        let subscriptionDate = new Date(item.subscriptiondate);
        let currentDateTime = new Date();
        let timeDifference = subscriptionDate.getTime() - currentDateTime.getTime();
        let remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return { ...item, remainingDays };
      });
    });
  }


  openEditBusinessForm() {
    this.dialog.open(EditBusinessFormComponent)
  }

  getBusinessList() {
    this.service.getAllBusiuness().subscribe({
      next: (res: any) => {
        this.apiResponse = res;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['editbusiness', id]);
  }

  showUsers(businessId: string) {
    this.service.setSelectedBusinessId(businessId);
    this.router.navigate(['multiusers', businessId]);
  }


  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


