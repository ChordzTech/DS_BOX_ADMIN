import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trialBusinesses: any;
  activeBusinesses: any;
  expiredBusinesses: any;
  allBusinesses :any;

  barChartType: any;

  constructor(private service: ServiceService) { }

  public chart: Chart | undefined;

  private trialCount(data: any[], status: string): number {
    return data.filter(item => item.status === status).length;
  }
  private activeCount(data: any[], status: string): number {
    return data.filter(item => item.status === status).length;
  }
  private expiredCount(data: any[], status: string): number {
    return data.filter(item => item.status === status).length;
  }

  ngOnInit() {
    this.service.getAllBusinessDetails().subscribe({
      next: (res: any) => {
        this.trialBusinesses = this.trialCount(res, 'Trial');
        this.activeBusinesses = this.activeCount(res, 'Active');
        this.expiredBusinesses = this.expiredCount(res, 'Expired');
        this.allBusinesses = res.length;
      },
      error: (err: any) => {
        alert(err);
      }
    });
    

    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
        datasets: [
          {
            label: "# of Last week Joinings",
            data: [10, 14, 5, 4, 6, 17, 7],
            backgroundColor: [
              "rgb(134,142,150)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(238,238,238, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          },
          {
            label: "# of this week Joinings",
            data: [12, 19, 3, 5, 2, 3, 9],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgb(7,157,243)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          // yAxes: [
          //   {
          //     ticks: {
          //       beginAtZero: true
          //     }
          //   }
          // ]
        }
      }
    });
  }
}
