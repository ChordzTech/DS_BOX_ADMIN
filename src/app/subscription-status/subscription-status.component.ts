import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.scss']
})
export class SubscriptionStatusComponent implements OnInit {
  displayedColumns: string[] = ['business_id', 'business_name', 'contact_no', 'subscription_date', 'remaining_days'];
  dataSource!: MatTableDataSource<any>;
  public dataLoaded: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getSubcriptionEndingSoonList()
  }

  getSubcriptionEndingSoonList() {
    this.service.SubcriptionEndingSoon().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.data);
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
