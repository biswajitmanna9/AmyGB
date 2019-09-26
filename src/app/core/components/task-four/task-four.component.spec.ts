import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFourComponent } from './task-four.component';

describe('TaskFourComponent', () => {
  let component: TaskFourComponent;
  let fixture: ComponentFixture<TaskFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
