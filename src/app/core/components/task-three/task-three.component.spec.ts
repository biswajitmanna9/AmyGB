import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskThreeComponent } from './task-three.component';

describe('TaskThreeComponent', () => {
  let component: TaskThreeComponent;
  let fixture: ComponentFixture<TaskThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
