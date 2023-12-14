import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ServiceService } from '../../../../shared/service.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { EdituserFormComponent } from "../../../../edituser-form/edituser-form.component";

@Component({
  selector: 'app-multi-users',
  templateUrl: './multi-users.component.html',
  styleUrls: ['./multi-users.component.scss']
})
export class MultiUsersComponent implements OnInit {
  displayedColumns: string[] = ['businessId', 'deviceId', 'username', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialog: any;



  ngOnInit(): void {
    this.getUsersList()
  }
  constructor(private service: ServiceService, dialog: MatDialog) { }

  openEditUserForm() {
    this.dialog.open(EdituserFormComponent)
  }

  getUsersList() {
    this.service.getAllUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
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
