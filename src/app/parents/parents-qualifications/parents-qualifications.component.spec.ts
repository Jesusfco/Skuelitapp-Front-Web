import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsQualificationsComponent } from './parents-qualifications.component';

describe('ParentsQualificationsComponent', () => {
  let component: ParentsQualificationsComponent;
  let fixture: ComponentFixture<ParentsQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsQualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
