import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEarningComponent } from './player-earning.component';

describe('PlayerEarningComponent', () => {
  let component: PlayerEarningComponent;
  let fixture: ComponentFixture<PlayerEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerEarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
