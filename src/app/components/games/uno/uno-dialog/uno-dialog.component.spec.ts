import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoDialogComponent } from './uno-dialog.component';

describe('UnoDialogComponent', () => {
  let component: UnoDialogComponent;
  let fixture: ComponentFixture<UnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
