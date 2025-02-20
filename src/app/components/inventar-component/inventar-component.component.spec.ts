import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarComponentComponent } from './inventar-component.component';

describe('InventarComponentComponent', () => {
  let component: InventarComponentComponent;
  let fixture: ComponentFixture<InventarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
