import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { isFormArray } from '@angular/forms';
import * as pluginDataLables from 'chartjs-plugin-datalabels';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  barChartType: any;

  constructor(private service: ServiceService) {}

  public chart: Chart | undefined;
  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
        datasets: [
          {
            label: '# of Last week Joinings',
            data: [10, 14, 5, 4, 6, 17, 7],
            backgroundColor: ['rgb(134,142,150)'],
            borderColor: ['rgba(238,238,238, 1)'],
            borderWidth: 1,
          },
          {
            label: '# of this week Joinings',
            data: [12, 19, 3, 5, 2, 3, 9],
            backgroundColor: ['rgb(7,157,243)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // public barChartOptions:any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  //   public mbarChartLabels:string[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  //   public barChartType:string = 'bar';
  //   public barChartLegend:boolean = true;

  //   public barChartColors:Array<any> = [
  //   {
  //     backgroundColor: 'rgba(105,159,177,0.2)',
  //     borderColor: 'rgba(105,159,177,1)',
  //     pointBackgroundColor: 'rgba(105,159,177,1)',
  //     pointBorderColor: '#fafafa',
  //     pointHoverBackgroundColor: '#fafafa',
  //     pointHoverBorderColor: 'rgba(105,159,177)'
  //   },
  //   {
  //     backgroundColor: 'rgba(77,20,96,0.3)',
  //     borderColor: 'rgba(77,20,96,1)',
  //     pointBackgroundColor: 'rgba(77,20,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,20,96,1)'
  //   }
  // ];
  //   public barChartData:any[] = [
  //     {data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A'},
  //     {data: [58, 55, 60, 79, 66, 57, 90], label: 'Company B'}
  //   ];

  //   // events
  //   public chartClicked(e:any):void {
  //     console.log(e);
  //   }

  //   public chartHovered(e:any):void {
  //     console.log(e);
  //   }

  //   public randomize():void {
  //     let data = [
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100)];
  //     let clone = JSON.parse(JSON.stringify(this.barChartData));
  //     clone[0].data = data;
  //     this.barChartData = clone;
  //   }

  // barChartsData = {
  //   lables:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //   datasets:[
  //     {
  //       data: [89, 78, 95, 56, 74, 23, 41],
  //       lable : 'Joinings in Week'
  //     }
  //   ]
  // }

  // barChart(){
  //   this.chartOptions = {
  //     chart:{
  //       type: 'column'
  //     },
  //     title: 'Joinings In Week'
  //   },
  //   {
  //     xAxis:{
  //       categories:[
  //         'Africa', 'America', 'Asia', 'Europe'
  //       ]
  //     },

  //     series: this.chartData
  //   }
  // }

  // chartOptions: any;
  // highcharts: typeof HighCharts = HighCharts;

  // // highchart Data
  // chartData = [
  //   {
  //     name: 'Year 1990',
  //     data: [631, 789, 6524, 721]
  //   },
  //   {
  //     name: 'Year 2000',
  //     data: [450, 554, 7524, 421]
  //   },
  //   {
  //     name: 'Year 2018',
  //     data: [731, 689, 8524, 321]
  //   }

  // ]

  trialcount: number = 0;
  activecount: number = 0;
  expiredcount: number = 0;
  allcount: number = 0;

  trialcountstop: any = setInterval(() => {
    this.trialcount++;

    if (this.trialcount == 7170) {
      clearInterval(this.trialcountstop);
    }
  }, 1);

  activecountstop: any = setInterval(() => {
    this.activecount++;

    if (this.trialcount == 452) {
      clearInterval(this.activecountstop);
    }
  }, 1);

  expiredcountstop: any = setInterval(() => {
    this.expiredcount++;

    if (this.expiredcount == 7512) {
      clearInterval(this.expiredcountstop);
    }
  }, 1);

  allcountstop: any = setInterval(() => {
    this.allcount++;

    if (this.allcount == 7622) {
      clearInterval(this.allcountstop);
    }
  }, 1);
}
