import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UnoGameStart} from '../services/uno/uno-game-start.service';
import {Deck} from '../services/uno/Deck';

@Component({
  selector: 'app-game-start',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.css'
})
export class GameStartComponent {

  protected numberOfPlayersBot: number = 2;
  protected numberOfPlayers: number = 2;

  protected players: { [key: string]: string[] } = {
    player1: [],
    player2: [],
  };

  protected discardPile: string[] = [];

  @Output() playersUpdated = new EventEmitter<{ [key: string]: string[] }>();
  @Output() firstCardOpeningOutput = new EventEmitter<string>();

  constructor(private gameService: UnoGameStart, private deck: Deck) {}

  private firstCardForOpening(): void {
    if (this.deck.getDeck().length === 0) return console.error("Deck ist leer.");

    const firstCard = this.deck.getDeck().shift()!;
    this.discardPile.push(firstCard);
    this.firstCardOpeningOutput.emit(firstCard);
  }

  private shuffleDeck(): void {
    const deckArray = this.deck.getDeck();
    for (let i = deckArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [deckArray[i], deckArray[random]] = [deckArray[random], deckArray[i]];
    }
  }

  private dealCards(): void {
    for (let i = 0; i < 7; i++) {
      Object.keys(this.players).forEach(player => {
        if (this.deck.getDeck().length > 0) {
          const card = this.deck.getDeck().shift();
          if (card) this.players[player].push(card);
        }
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

    this.shuffleDeck();
    this.firstCardForOpening();
    this.dealCards();

    this.playersUpdated.emit(this.players);
  }

  startGameBot(): void {
    this.gameService.setValue(true);
    this.startGame();
  }

  bot(event: Event): void {
    const targetBot = event.target as HTMLButtonElement;
    this.numberOfPlayersBot = Number(targetBot.innerText);
  }

  player(event: MouseEvent): void {
    const targetPlayer = event.target as HTMLButtonElement;
    this.numberOfPlayers = Number(targetPlayer.innerText);
  }

  startGamePlayer(): void {
    this.gameService.setValue(true);
  }
}
