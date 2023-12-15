import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditBusinessFormComponent } from 'src/app/edit-business-form/edit-business-form.component';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  displayedColumns: string[] = ['businessname', 'contactno', 'multiuser', 'status', 'subscriptiondate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  ngOnInit(): void {
    this.getBusinessList()
  }
  constructor(private service: ServiceService, private router: Router) { }

  getBusinessList() {
    this.service.getAllBusinessDetails().subscribe({
      next: (res: any) => {
       this.dataSource = new MatTableDataSource(res);
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

  onBtnClick(){
    this.router.navigate(['/editbusiness']);
  }
}
