import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EdituserFormComponent } from 'src/app/edituser-form/edituser-form.component';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = ['username', 'mobileno', 'userrole', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList() {
    this.service.getAllUserDetails().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(res);
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

  onBtnClick() {
    this.router.navigate(['/editusers']);
  }
}
