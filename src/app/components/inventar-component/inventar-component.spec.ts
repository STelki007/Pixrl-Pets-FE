import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarComponent } from './inventar-component';

describe('InventarComponentComponent', () => {
  let component: InventarComponent;
  let fixture: ComponentFixture<InventarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
