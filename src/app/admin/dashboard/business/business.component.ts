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
  public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false;
  totalRecords!: number;
  currentPage = 1;
  totalPages!: number;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getBusinessList();
  }

  getBusinessList() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['/home/editbusiness', id]);
  }

  showUsers(businessId: string) {
    this.service.setSelectedBusinessId(businessId);
    this.router.navigate(['/home/multiusers', businessId]);
  }
}
