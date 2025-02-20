import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCenterModalComponent } from './alert-center-modal-component';

describe('AlertCenterComponentComponent', () => {
  let component: AlertCenterModalComponent;
  let fixture: ComponentFixture<AlertCenterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCenterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertCenterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
