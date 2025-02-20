import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponentComponent } from './main-page-component.component';

describe('MainViewComponentComponent', () => {
  let component: MainPageComponentComponent;
  let fixture: ComponentFixture<MainPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
