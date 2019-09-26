import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
declare var Chart;

@Component({
  selector: 'task-four',
  templateUrl: './task-four.component.html',
  styleUrls: ['./task-four.component.scss']
})
export class TaskFourComponent implements OnInit {
  @Input() result: any = [];
  @Input() storeList: any = [];
  @Input() locationList: any = [];
  @Input() demoGraphicList: any = [];

  @ViewChild('pieChart') private chartContainer: ElementRef;
  filterKey: string;
  myChart: any;
  constructor() { }

  ngOnInit() {
    Chart.plugins.register(ChartDataLabels);
    this.filterKey = 'StoreID';
    this.loadChart()
  }

  ngOnChanges(changes: any) {
    // console.log(changes)
  }

  onFilterChange($event) {
    this.loadChart()
  }

  loadChart() {
    const ctx = this.chartContainer.nativeElement;
    var data = [];
    var name = "";
    var key = this.filterKey;
    var record = [];
    if (key == 'StoreID') {
      name = 'Store';
      record = this.storeList;
    }
    else if (key == 'GeographicalID') {
      name = 'Location';
      record = this.locationList;
    }
    else if (key == 'DemoGraphicID') {
      name = 'Graphic';
      record = this.demoGraphicList;
    }
    record.forEach(x => {
      var sum = 0;
      var d = {
        id: x,
        name: name,
        sales: 0
      }
      var filterData = this.result.filter(y => y[key] == x);
      filterData.forEach(z => {
        for (var i = 1; i < 53; i++) {
          sum += z['FW' + i]
        }
      })
      d['sales'] = sum;
      data.push(d)
    });
    var display = data.sort((a, b) => b.sales - a.sales);
    var record = display.slice(0, 5)
    var datasetData = [];
    var labels = [];
    record.forEach(x => {
      datasetData.push(x.sales)
      labels.push(x.name + " " + x.id)
    })
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
    this.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: datasetData,
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue"
            ]
          }
        ],
        labels: labels
      },
      options: {
        responsive: true,        
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value * 100 / sum).toFixed(2) + "%";
              return percentage;
            },
            color: '#fff',
          }
        }
      }
    });

  }

}
