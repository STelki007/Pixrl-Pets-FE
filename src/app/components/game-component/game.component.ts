import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {UnoComponent} from '@components/games/uno/uno.component';
import {TicTacToeComponent} from '@components/games/tic-tac-toe/tic-tac-toe.component';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';
import {SoundService} from '@services/SoundService';
import {PlayerEarningComponent} from '@components/games/player-earning/player-earning.component';
import {PlayerWinsUnoService} from '@components/games/uno/services/uno/player-wins-uno.service';


@Component({
  selector: 'app-game-component',
  imports: [
    NgIf,
    UnoComponent,
    TicTacToeComponent,
    PlayerEarningComponent,
    AsyncPipe,

  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  standalone: true
})
export class GameComponent implements OnInit {
  selectedGame: 'uno' | 'tic-tac-toe' | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private gameService: UnoGameStart,
    private soundService: SoundService,
    protected playerWinsService: PlayerWinsUnoService,
  ) {}

  ngOnInit(): void {
  }

  createAudio() {
    this.soundService.playSound("select-item.mp3")
  }

  onUnoClick() {
    this.createAudio();
    this.selectedGame = 'uno';
    this.cdr.detectChanges();
  }

  onTicTacToeClick() {
    this.selectedGame = 'tic-tac-toe';
  }

  backToMenu() {
    this.selectedGame = null;
    this.gameService.setValue(false)
  }
}
