import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersQualificationsComponent } from './teachers-qualifications.component';

describe('TeachersQualificationsComponent', () => {
  let component: TeachersQualificationsComponent;
  let fixture: ComponentFixture<TeachersQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersQualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
