import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickColorCenterComponent } from './pick-color-center.component';

describe('PickColorCenterComponent', () => {
  let component: PickColorCenterComponent;
  let fixture: ComponentFixture<PickColorCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickColorCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickColorCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
