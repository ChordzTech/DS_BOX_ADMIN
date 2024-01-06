import { Component, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/models';

@Component({
  selector: 'app-subscripton',
  templateUrl: './subscripton.component.html',
  styleUrls: ['./subscripton.component.scss']
})
export class SubscriptonComponent {

  displayedColumns: string[] = ['subscriptionid','subscription', 'duration', 'amount', 'action'];
  dataSource!: MatTableDataSource<Subscription>;
  public subscription!: Subscription[];
  public dataLoaded: boolean = false;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getSubscriptionList()
  }

  getSubscriptionList() {
    this.service.getAllSubscriptionDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.subscription = res.data;
        this.dataSource = new MatTableDataSource(this.subscription);
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
    this.router.navigate(['/home/editsubscription', id]);
  }
}
