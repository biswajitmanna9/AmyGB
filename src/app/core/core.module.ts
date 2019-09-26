import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { XlsxToJsonService } from './services/xlsx-to-json.service';
import { TaskOneComponent } from './components/task-one/task-one.component';
import { TaskTwoComponent } from './components/task-two/task-two.component';
import { TaskThreeComponent } from './components/task-three/task-three.component';
import { TaskFourComponent } from './components/task-four/task-four.component';

@NgModule({
  declarations: [
    TaskOneComponent,
    TaskTwoComponent,
    TaskThreeComponent,
    TaskFourComponent
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TaskOneComponent,
    TaskTwoComponent,
    TaskThreeComponent,
    TaskFourComponent
  ],
  entryComponents: [

  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        XlsxToJsonService
      ]
    }
  }
}
