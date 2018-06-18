import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentShowPermissionComponent } from './parent-show-permission.component';

describe('ParentShowPermissionComponent', () => {
  let component: ParentShowPermissionComponent;
  let fixture: ComponentFixture<ParentShowPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentShowPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentShowPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
