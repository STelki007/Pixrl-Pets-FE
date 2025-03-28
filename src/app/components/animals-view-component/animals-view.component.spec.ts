import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsViewComponent } from './animals-view.component';

describe('AnimalViewComponentComponent', () => {
  let component: AnimalsViewComponent;
  let fixture: ComponentFixture<AnimalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
