import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalViewComponentComponent } from './animal-view-component.component';

describe('AnimalViewComponentComponent', () => {
  let component: AnimalViewComponentComponent;
  let fixture: ComponentFixture<AnimalViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalViewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
