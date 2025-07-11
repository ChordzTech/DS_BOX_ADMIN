import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  displayedColumns: string[] = ['businessid', 'businessname', 'contactno', 'estimate_count', 'multiuser', 'status', 'action'];
  dataSource!: MatTableDataSource<Business>;
  public business!: Business[];
  public statusList: string[] = ['All', 'Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false;
  totalRecords!: number;
  currentPage = 1;
  totalPages!: number;
  searchTerm: string = '';
  validationMessage: string = '';
  selectedStatus: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBusinessList();  // Load all business data initially
  }

  getAllBusinessList() {
    this.service.getAllBusinessDetails(this.currentPage).subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.business = res.data;
        this.dataSource = new MatTableDataSource(this.business);
        this.dataSource.sort = this.sort;
        this.totalRecords = res.total_records;
        this.totalPages = Math.ceil(this.totalRecords / 50); // Assuming 50 records per page
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  getBusinessByStatus() {
    if (this.selectedStatus) {
      this.service.getBusinessByStatus(this.selectedStatus, this.currentPage).subscribe({
        next: (res: any) => {
          this.dataLoaded = true;
          this.business = res.data;
          this.dataSource = new MatTableDataSource(this.business);
          this.dataSource.sort = this.sort;
          this.totalRecords = res.total_records;
          this.totalPages = Math.ceil(this.totalRecords / 50);
        },
        error: (err: any) => {
          alert(err);
        }
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBusinessList();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBusinessList();
    }
  }

  getRange(): string {
    const start = (this.currentPage - 1) * 50 + 1;
    const end = Math.min(this.currentPage * 50, this.totalRecords);
    return `${start} - ${end} of ${this.totalRecords}`;
  }

  applyFilter(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.getBusinessList();
      return;
    }

    this.searchTerm = searchTerm.trim();

    if (!this.isSearchTermValid()) {
      return;
    }

    this.service.businessSearch(this.searchTerm).subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.business = res.data;
        this.dataSource = new MatTableDataSource(this.business);
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  isSearchTermValid(): boolean {
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
    this.validationMessage = '';
    return true;
  }

  isMobileSearch(): boolean {
    return /^\d+$/.test(this.searchTerm);
  }

  onChange(filterValue: string) {
    this.selectedStatus = filterValue.toLowerCase();
    this.currentPage = 1;
    this.getBusinessByStatus();  // Only fetch data based on selected status
  }

  edit(id: number) {
    this.router.navigate(['/home/editbusiness', id]);
  }

  showUsers(businessId: string) {
    this.service.setSelectedBusinessId(businessId);
    this.router.navigate(['/home/multiusers', businessId]);
  }

  private getBusinessList() {
    if (this.selectedStatus) {
      this.getBusinessByStatus();
    } else {
      this.getAllBusinessList();
    }
  }
}
