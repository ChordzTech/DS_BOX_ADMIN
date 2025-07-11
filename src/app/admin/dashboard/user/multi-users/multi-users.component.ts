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
  selectedBusinessId: string | null = null;
  public dataLoaded: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.selectedBusinessId$.subscribe((businessId) => {
      this.selectedBusinessId = businessId;
      this.getUsersList(this.selectedBusinessId);
    });
  }

  getUsersList(businessId: string | null) {
    if (businessId) {
      this.service.getMultiusers(businessId).subscribe({
        next: (res: any) => {
          this.dataLoaded = true;
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
        },
        error: (err: any) => {
          console.error('Error fetching user data:', err);
        }
      });
    } else {
      console.warn('No business ID selected.');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

