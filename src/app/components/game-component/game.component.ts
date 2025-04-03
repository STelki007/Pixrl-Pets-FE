import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UnoComponent} from '@components/games/uno/uno.component';
import {CheckUno} from '@components/games/uno/services/uno/ShopUnoInMainView';

@Component({
  selector: 'app-game-component',
  imports: [
    NgIf,
    UnoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  private gameClickAudio = HTMLAudioElement;
  protected unoGameClick = false;
  // protected items = Array(6).fill(0);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createAudio();

  }

  createAudio() {
    this.gameClickAudio = new Audio("select-item.mp3");
    this.gameClickAudio.volume = 1;
  }

  onAnimalCardClick() {
    this.gameClickAudio.currentTime = 0;
    this.gameClickAudio.play().then(() => {
      console.log(this.unoGameClick);
      this.unoGameClick = !this.unoGameClick;
      this.cdr.detectChanges();
      console.log(this.unoGameClick);
    });
  }
}
