import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-multi-users',
  templateUrl: './multi-users.component.html',
  styleUrls: ['./multi-users.component.scss']
})
export class MultiUsersComponent implements OnInit {
  displayedColumns: string[] = ['businessid', 'userid', 'username', 'mobileno', 'userrole', 'status'];
  dataSource!: MatTableDataSource<User>;
  public users!: User[];
  selectedBusinessId: string | null = null;
  public dataLoaded: boolean = false;
  currentPage = 1;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.selectedBusinessId$.subscribe((businessId) => {
      this.selectedBusinessId = businessId;
      this.getUsersList(this.selectedBusinessId);
    });
  }

  getUsersList(businessId: string | null) {
    this.service.getAllUserDetails(this.currentPage).subscribe({
      next: (res: any) => {
        if (Array.isArray(res.data)) {
          if (businessId) {
            this.users = res.data.filter((user: User) => user.businessid === businessId);
          } else {
            this.users = res.data;
          }
          this.dataLoaded = true;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
        } else {
          console.error('API response is not an array:', res.data);
        }
      },
      error: (err: any) => {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

