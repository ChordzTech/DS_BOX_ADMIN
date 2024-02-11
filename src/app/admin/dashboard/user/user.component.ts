import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
  totalRecords!: number;
  currentPage = 1;
  totalPages!: number;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList() {
    this.service.getAllUserDetails(this.currentPage).subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.users = res.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.totalRecords = res.total_records;
        this.totalPages = Math.ceil(this.totalRecords / 50);
      },
      error: (err: any) => {
        alert(err);
      }
    })
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsersList();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsersList();
    }
  }

  getRange(): string {
    const start = (this.currentPage - 1) * 50 + 1;
    const end = Math.min(this.currentPage * 50, this.totalRecords);
    return `${start} - ${end} of ${this.totalRecords}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['/home/editusers', id]);
  }
}
