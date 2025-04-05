import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UnoComponent} from '@components/games/uno/uno.component';
import {CheckUno} from '@components/games/uno/services/uno/ShopUnoInMainView';
import {TicTacToeComponent} from '@components/games/tic-tac-toe/tic-tac-toe.component';
import {UnoGameStart} from '@components/games/uno/services/uno/uno-game-start.service';

@Component({
  selector: 'app-game-component',
  imports: [
    NgIf,
    UnoComponent,
    TicTacToeComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  private gameClickAudio = HTMLAudioElement;
  protected unoGameClick = false;
  selectedGame: 'uno' | 'tic-tac-toe' | null = null;

  constructor(private cdr: ChangeDetectorRef, private gameService: UnoGameStart) {}

  ngOnInit(): void {
    this.createAudio();
  }

  createAudio() {
    this.gameClickAudio = new Audio("select-item.mp3");
    this.gameClickAudio.volume = 1;
  }

  onUnoClick() {
    this.gameClickAudio.currentTime = 0;
    this.gameClickAudio.play().then(() => {
      console.log(this.unoGameClick);
      this.selectedGame = 'uno';
      this.cdr.detectChanges();
      console.log(this.unoGameClick);
    });
  }

  onTicTacToeClick() {
    this.selectedGame = 'tic-tac-toe';
  }

  backToMenu() {
    this.selectedGame = null;
    this.gameService.setValue(false)

  }
}
