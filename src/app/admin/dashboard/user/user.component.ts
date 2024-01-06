import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['userid', 'username', 'mobileno', 'userrole', 'status', 'action'];
  dataSource!: MatTableDataSource<User>;
  public users!: User[];
  public dataLoaded: boolean = false;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList() {
    this.service.getAllUserDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.users = res.data;
        this.dataSource = new MatTableDataSource(this.users);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  edit(id: number) {
    this.router.navigate(['/home/editusers', id]);
  }
}
