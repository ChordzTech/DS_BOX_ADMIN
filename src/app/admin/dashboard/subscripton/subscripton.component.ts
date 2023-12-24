import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditSubscriptionFormComponent } from 'src/app/edit-subscription-form/edit-subscription-form.component';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-subscripton',
  templateUrl: './subscripton.component.html',
  styleUrls: ['./subscripton.component.scss']
})
export class SubscriptonComponent {

  displayedColumns: string[] = ['subscription', 'duration', 'amount', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialog: any;



  ngOnInit(): void {
    this.getSubscriptionList()
  }
  constructor(private service: ServiceService, dialog: MatDialog) { }

  openEditSubscription(){
    this.dialog.open(EditSubscriptionFormComponent)
  }

  getSubscriptionList() {
    this.service.getSubscription().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

}
