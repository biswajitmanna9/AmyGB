import { Component } from '@angular/core';
import { XlsxToJsonService } from './core/services/xlsx-to-json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AmyGB Data Visualization';
  result: any = [];
  storeList: any = [];
  locationList: any = [];
  demoGraphicList: any = [];
  constructor(
    private xlsxToJsonService: XlsxToJsonService
  ) {

  }

  onFileChange(evt: any) {
    let file = evt.target.files[0];
    this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
      this.result = data['sheets'].Sheet1;
      this.storeList = this.result.map(item => item.StoreID)
        .filter((value, index, self) => self.indexOf(value) === index)
      this.locationList = this.result.map(item => item.GeographicalID)
        .filter((value, index, self) => self.indexOf(value) === index)
      this.demoGraphicList = this.result.map(item => item.DemoGraphicID)
        .filter((value, index, self) => self.indexOf(value) === index)
    })
  }

}
