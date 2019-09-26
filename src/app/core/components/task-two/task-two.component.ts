import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import 'chart.js';
import 'chartjs-chart-treemap';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
declare var Chart;

@Component({
  selector: 'task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.scss']
})
export class TaskTwoComponent implements OnInit {
  @Input() result: any = [];
  @Input() storeList: any = [];
  @Input() locationList: any = [];
  @Input() demoGraphicList: any = [];

  @ViewChild('lineChart') private chartContainer: ElementRef;
  filterKey: string;
  myChart: any;
  constructor() { }

  ngOnInit() {
    Chart.plugins.unregister(ChartDataLabels);
    this.filterKey = 'GeographicalID';
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
      var FWData = [];
      var d = {
        label: name + ' ' + x,
        data: [],
        fill: false,
      }
      var filterData = this.result.filter(y => y[key] == x);
      filterData.forEach(z => {
        if (FWData.length > 0) {
          for (var i = 0; i < 52; i++) {
            var newSum = FWData[i] + z['FW' + (i + 1)];
            FWData[i] = newSum
          }
        }
        else {
          for (var j = 1; j < 53; j++) {
            FWData.push(z['FW' + j])
          }
        }

      })
      d['data'] = FWData;
      data.push(d)
    });
    console.log(data)
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
    var labels = [];
    for (var i = 1; i < 53; i++) {
      labels.push('FW' + i)
    }
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: data
      },
      options: {
        responsive: true,        
        scales: {
          xAxes: [

          ],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        onClick: (event: MouseEvent, active: {}[]) => {
          if (active.length > 0) {
            var activePoints = this.myChart.getElementsAtEventForMode(event, 'point', this.myChart.options);
            var firstPoint = activePoints[0];
            var label = this.myChart.data.labels[firstPoint._index];
            var value = this.myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            var legend = this.myChart.data.datasets[firstPoint._datasetIndex].label;
            var d = {
              label: label,
              legend: legend,
              value: value
            }
            this.refreshChart(d)
          }
        }
      },

    });

  }

  refreshChart(d) {
    const ctx = this.chartContainer.nativeElement;
    var data = [];
    var name = "Store";
    var key = this.filterKey;
    var id = +d['legend'].split(' ')[1]
    var filterData = this.result.filter(x => x[key] == id)
    filterData.forEach(y => {
      for (var i = 1; i < 53; i++) {
        if(('FW' + i) == d['label']){
          var k = {
            id: y['StoreID'],
            name: name,
            sales: y['FW' + i]
          }
          data.push(k)
        }
      }
    })
    console.log(data)
    
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
          text: "Overall sales trends based on " + name + " under " + d['legend'] + " of " + d['label']
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
    this.filterKey = null;
  }

}
