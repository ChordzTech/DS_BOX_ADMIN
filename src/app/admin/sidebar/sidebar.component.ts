import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
// active: string|string[];
  constructor(
    private router: Router
  ) {
    // this.router.navigateByUrl('/dashboard')



  }

}
