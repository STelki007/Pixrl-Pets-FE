import {Component, OnInit} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-player-earning-gui',
  imports: [
    BrowserAnimationsModule,
  ],
  templateUrl: './player-earning-gui.component.html',
  styleUrl: './player-earning-gui.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class PlayerEarningGUIComponent implements OnInit {
  showCoinsDiv = false;

  ngOnInit() {
    this.showOnce()
  }

  showOnce(): void {
    this.showCoinsDiv = true;

    setTimeout(() => {
      this.showCoinsDiv = false;
    }, 8000);
  }

  closeCoinsDiv(): void {
    this.showCoinsDiv = false;
  }

}
