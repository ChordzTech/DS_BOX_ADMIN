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
    this.getBusinessList();
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
    });
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
    this.router.navigate(['/home/editbusiness', id]);
  }

  showUsers(businessId: string) {
    this.service.setSelectedBusinessId(businessId);
    this.router.navigate(['/home/multiusers', businessId]);
  }

  // calculateRemainingDays(activationDate: string): string {
  //   const currentDate = new Date();
  //   const activationDateObj = new Date(activationDate); // Assuming activationDate is in a valid date format

  //   // Calculate the difference in days
  //   const differenceInDays = Math.floor(
  //     (activationDateObj.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  //   );

  //   if (differenceInDays > 0) {
  //     if (differenceInDays <= 7) {
  //       return `${differenceInDays} days remaining`;
  //     } else {
  //       return 'Expired';
  //     }
  //   } else {
  //     return 'Expired';
  //   }
  // }

  calculateRemainingDays(activationDate: string): string {
    const currentDate = new Date();
    const activationDateObj = new Date(activationDate); // Assuming activationDate is in 'YYYY-MM-DD' format

    // Calculate the date that is 7 days from the activation date
    const expirationDate = new Date(activationDateObj.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Calculate the difference in days
    const differenceInDays = Math.floor(
      (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Check if the activation date is within the next 7 days
    if (differenceInDays >= 0 && differenceInDays <= 6) {
      return `Active ${differenceInDays} Day${differenceInDays === 1 ? '' : 's'}`;
    } else {
      return 'Expired';
    }
  }

  getRowTextColor(row: Business): string {
    const remainingDays = this.calculateRemainingDays(row.activationdate);
    const remainingDaysNumber = parseInt(remainingDays);

    if (!isNaN(remainingDaysNumber)) {
      if (remainingDaysNumber > 7) {
        return 'green'; // Set the desired color for active text
      } else {
        return 'orange'; // Set the desired color for trial text
      }
    } else if (remainingDays.toLowerCase().includes('expired')) {
      return 'red'; // Set the desired color for expired text
    } else {
      return 'green'; // Default color for other statuses
    }
  }



}
