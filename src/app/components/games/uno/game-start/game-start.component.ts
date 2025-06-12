import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Deck} from '../services/uno/Deck';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';
import {SoundService} from '@services/SoundService';
import {GameService} from '@components/games/uno/services/uno/GameService';
import {PlayerWinsUnoService} from '@components/games/uno/services/uno/player-wins-uno.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {PlayerEarningComponent} from '@components/games/player-earning/player-earning.component';

@Component({
  selector: 'app-game-start',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf, PlayerEarningComponent],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.css'
})
export class GameStartComponent {
  @Output() playersUpdated = new EventEmitter<{ [key: string]: string[] }>();
  @Output() firstCardOpeningOutput = new EventEmitter<string>();

  protected numberOfPlayersBot: number = 2;
  protected numberOfPlayers: number = 2;
  protected players: { [key: string]: string[] } = {
    player1: [],
    player2: [],
  };

  protected discardPile: string[] = [];

  constructor(
    private unoGameStart: UnoGameStart,
    private deck: Deck,
    private soundService: SoundService,
    private gameService: GameService,
    protected playerWinsService: PlayerWinsUnoService,

  ) {}

  private handleFirstCardOpening(): void {
    if (this.deck.getDeck().length === 0) return console.warn("Deck ist leer.");

    let firstCard = "";

    while (true) {
      firstCard = this.deck.getDeck().shift()!;

      if (!(firstCard.includes("ChangeColor") || firstCard.includes("4CardPlus"))){
        break;
      } else{
        this.deck.getDeck().push(firstCard);
      }
    }

    this.discardPile.push(firstCard);
    this.firstCardOpeningOutput.emit(firstCard);
  }

  private dealCards(): void {
    for (let i = 0; i < 7; i++) {
      Object.keys(this.players).forEach(player => {
        let card =  this.deck.getDeck().shift();
        this.players[player].push(card!);
      });
    }
  }

  public startGame(): void {
    this.deck.resetDeck();
    this.discardPile = [];
    this.players = {};

    for (let i = 1; i <= this.numberOfPlayers; i++) {
      this.players[`player${i}`] = [];
    }

    this.gameService.shuffleDeck(this.deck.getDeck());
    this.handleFirstCardOpening();
    this.dealCards();

    this.playersUpdated.emit(this.players);
  }

  startGameBot(): void {
    this.soundService.playSound("select-item.mp3")
    this.unoGameStart.setValue(true);
    this.playerWinsService.setValue(false);
    this.startGame();
  }

  player(event: MouseEvent): void {
    const targetPlayer = event.target as HTMLButtonElement;
    this.numberOfPlayers = Number(targetPlayer.innerText);
  }

  startGamePlayer(): void {
    this.soundService.playSound("select-item.mp3")
    this.unoGameStart.setValue(true);
  }


}
