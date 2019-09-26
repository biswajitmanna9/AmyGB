import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import 'chart.js';
import 'chartjs-chart-treemap';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
declare var Chart;

@Component({
  selector: 'task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss']
})
export class TaskOneComponent implements OnInit {
  @Input() result: any = [];
  @Input() storeList: any = [];
  @Input() locationList: any = [];
  @Input() demoGraphicList: any = [];

  @ViewChild('treeMap') private chartContainer: ElementRef;
  filterKey: string;
  myChart: any;
  constructor() { }

  ngOnInit() {
    Chart.plugins.unregister(ChartDataLabels);
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
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
    this.myChart = new Chart(ctx, {
      type: 'treemap',
      data: {
        datasets: [
          {
            label: "Sample",
            tree: data,
            key: "sales",
            spacing: 0.1,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Overall sales trends for the entire year based on " + name
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: function (item, data) {
              var item = item[0];
              var dataItem = data.datasets[item.datasetIndex].data[item.index];
              var obj = dataItem._data;
              return obj['name'] + ' ' + obj['id'];
            },
            label: function (item, data) {
              var dataset = data.datasets[item.datasetIndex];
              var dataItem = dataset.data[item.index];
              return "Sales " + dataItem.v;
            }
          }
        }
      }
    });

  }

}
