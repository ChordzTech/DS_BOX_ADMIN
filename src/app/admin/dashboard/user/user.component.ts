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
  filteredRecords: any[] = [];
  searchTerm: string = '';
  validationMessage: string = '';

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

  applyFilter(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      // If search term is empty, fetch all records
      this.getUsersList();
      return;
    }

    this.searchTerm = searchTerm.trim(); // Update the search term

    if (!this.isSearchTermValid()) {
      return; // Exit search if search term is invalid
    }

    this.service.userSearch(this.searchTerm).subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.users = res.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  isSearchTermValid(): boolean {
    // Check if the search term is valid based on the search type
    if (this.isMobileSearch()) {
      if (this.searchTerm.length < 5) {
        this.validationMessage = 'At least 5 numbers are required for mobile number search.';
        return false;
      }
    } else {
      if (this.searchTerm.length < 3) {
        this.validationMessage = 'At least 3 characters are required for name search.';
        return false;
      }
    }
    this.validationMessage = ''; // Reset validation message if search term is valid
    return true;
  }

  isMobileSearch(): boolean {
    // Check if the search term contains only digits
    return /^\d+$/.test(this.searchTerm);
  }

  edit(id: number) {
    this.router.navigate(['/home/editusers', id]);
  }
}
