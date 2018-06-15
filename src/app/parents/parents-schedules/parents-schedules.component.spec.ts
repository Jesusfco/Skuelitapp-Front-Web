import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsSchedulesComponent } from './parents-schedules.component';

describe('ParentsSchedulesComponent', () => {
  let component: ParentsSchedulesComponent;
  let fixture: ComponentFixture<ParentsSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
