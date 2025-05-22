import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoPlayerChatComponent } from './uno-player-chat.component';

describe('UnoPlayerChatComponent', () => {
  let component: UnoPlayerChatComponent;
  let fixture: ComponentFixture<UnoPlayerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnoPlayerChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnoPlayerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
