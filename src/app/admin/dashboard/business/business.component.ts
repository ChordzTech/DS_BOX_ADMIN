import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
export class BusinessComponent {
  displayedColumns: string[] = ['businessid', 'businessname', 'contactno', 'multiuser', 'status', 'activationdate', 'action'];
  dataSource!: MatTableDataSource<Business>;
  public business!: Business[];
  public statusList: string[] = ['Active', 'Trial', 'Expired'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getBusinessList()
  }
  constructor(private service: ServiceService, private router: Router) { }

  getBusinessList() {
    this.service.getAllBusinessDetails().subscribe({
      next: (res: any) => {
        this.business = res.data;
        this.dataSource = new MatTableDataSource(this.business);
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

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['editbusiness', id]);
  }

  showUsers(businessId: string) {
    this.service.setSelectedBusinessId(businessId);
    this.router.navigate(['multiusers', businessId]);
  }
}
