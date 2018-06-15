import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsQualificationsComponent } from './students-qualifications.component';

describe('StudentsQualificationsComponent', () => {
  let component: StudentsQualificationsComponent;
  let fixture: ComponentFixture<StudentsQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsQualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
