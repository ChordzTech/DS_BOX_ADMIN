import { Component, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent {

  displayedColumns: string[] = ['configid', 'configname', 'configvalue', 'action'];
  dataSource!: MatTableDataSource<any>;
  public dataLoaded: boolean = false;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAppConfigList()
  }

  getAppConfigList() {
    this.service.getAllAppConfig().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
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
    this.router.navigate(['/home/editappConfig', id]);
  }
}
