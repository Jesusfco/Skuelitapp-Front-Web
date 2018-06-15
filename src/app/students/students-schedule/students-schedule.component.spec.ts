import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsScheduleComponent } from './students-schedule.component';

describe('StudentsScheduleComponent', () => {
  let component: StudentsScheduleComponent;
  let fixture: ComponentFixture<StudentsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
