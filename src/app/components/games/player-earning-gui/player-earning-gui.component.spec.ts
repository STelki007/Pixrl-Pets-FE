import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEarningGUIComponent } from './player-earning-gui.component';

describe('PlayerEarningGUIComponent', () => {
  let component: PlayerEarningGUIComponent;
  let fixture: ComponentFixture<PlayerEarningGUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerEarningGUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerEarningGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
