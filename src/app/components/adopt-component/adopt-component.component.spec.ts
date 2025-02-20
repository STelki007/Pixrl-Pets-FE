import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptComponentComponent } from './adopt-component.component';

describe('AdoptComponentComponent', () => {
  let component: AdoptComponentComponent;
  let fixture: ComponentFixture<AdoptComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
