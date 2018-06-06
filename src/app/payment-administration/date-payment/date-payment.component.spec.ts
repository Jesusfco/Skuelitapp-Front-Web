import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePaymentComponent } from './date-payment.component';

describe('DatePaymentComponent', () => {
  let component: DatePaymentComponent;
  let fixture: ComponentFixture<DatePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
