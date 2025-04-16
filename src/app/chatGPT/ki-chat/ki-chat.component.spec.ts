import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiChatComponent } from './ki-chat.component';

describe('KiChatComponent', () => {
  let component: KiChatComponent;
  let fixture: ComponentFixture<KiChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KiChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
