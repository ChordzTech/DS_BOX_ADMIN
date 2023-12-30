import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EdituserFormComponent } from 'src/app/edituser-form/edituser-form.component';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  subscription: any;
  status: any;
  dialog: any;

  displayedColumns: string[] = ['userid', 'username', 'mobileno', 'businessid', 'userrole', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  ngOnInit(): void {
    this.getUsersList();
  }
  constructor(private service: ServiceService, dialog: MatDialog) { }

  openEditUserForm() {
    this.dialog.open(EdituserFormComponent)
  }

  getUsersList() {
    this.service.getAllUserDetails().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      }
    })
  }

  //   getUsersSubscriptList() {
  //     this.service.getUserSubscription().subscribe({
  //       next: (res: any) => {
  //         this.subscription = res;
  //         this.checkStatus();
  //       },
  //       error: (err: any) => {
  //         alert(err);
  //       }
  //     })
  //   }

  //   checkStatus(): void {
  //     const currentDate = new Date();
  //     const subscriptionStartDate = new Date(this.subscription.subscriptiondate);

  //     if (subscriptionStartDate < currentDate) {
  //       this.status = 'expired', `<style>color: red</style>`;
  //     } else if (subscriptionStartDate === currentDate) {
  //       this.status = 'expiring today';
  //     } else if (subscriptionStartDate > currentDate) {
  //       this.status = 'active';
  //     }
  //  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // ReadMore:boolean = true


  // visible:boolean = false



  // onclick()
  // {
  //   this.ReadMore = !this.ReadMore; 
  //   this.visible = !this.visible;

  // }

}
