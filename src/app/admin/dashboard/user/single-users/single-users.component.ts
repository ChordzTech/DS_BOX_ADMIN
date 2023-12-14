import { Component,ViewChild, OnInit } from '@angular/core';
import { ServiceService } from '../../../../shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-single-users',
  templateUrl: './single-users.component.html',
  styleUrls: ['./single-users.component.scss']
})
export class SingleUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'businessId', 'deviceId', 'username', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 



  ngOnInit(): void {
    this.getUsersList()
  }
  constructor(private service: ServiceService) { }

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
