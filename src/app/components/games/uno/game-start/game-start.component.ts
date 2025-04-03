import {Component, EventEmitter, Input, OnInit, Output, output} from '@angular/core';
import {NgIf} from '@angular/common';
import {GameService} from '../services/uno/GameService';
import {FormsModule} from '@angular/forms';
import {Deck} from '../services/uno/Deck';

@Component({
  selector: 'app-game-start',
  imports: [
    FormsModule
  ],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.css'
})
export class GameStartComponent {

  protected numberOfPlayersBot :number = 2;
  protected numberOfPlayers :number = 2;


  protected players: { [key: string]: string[] } = {
    player1: [],
    player2: [],
  };

  @Output() playersUpdated = new EventEmitter<{ [key: string]: string[] }>();
  @Output() firstCardOpeningOutput = new EventEmitter<string>();
  protected discardPile: string[] = [];


  constructor(private gameService: GameService, private deck: Deck) {
  }


  firstCardForOpening(){
    if (this.deck.getDeck().length === 0) {
      console.error("Deck is empty! Can not draw the first card.");
      return;
    }
    const firstCard = this.deck.getDeck().shift()!;
    this.discardPile.push(firstCard);
    this.firstCardOpeningOutput.emit(firstCard);
  }

// hier wird  Fisher-Yates-Shuffle Algorithmen angewendet.
  private shuffleDeck(): void {
    for (let i = this.deck.getDeck().length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [this.deck.getDeck()[i], this.deck.getDeck()[random]] = [this.deck.getDeck()[random], this.deck.getDeck()[i]];
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
    this.shuffleDeck();
    this.firstCardForOpening();
    console.log(this.firstCardOpeningOutput);
    this.players = {};
    for (let i = 1; i <= this.numberOfPlayers; i++) {
      this.players[`player${i}`] = [];
    }
    this.dealCards()
    this.playersUpdated.emit(this.players);
  }

  startGameBot() {
    this.gameService.setValue(true)
    this.startGame();
  }

  bot(event: Event) {
    const targetBot = event.target as HTMLButtonElement;
    this.numberOfPlayersBot = Number(targetBot.innerText);
  }

  player(event: MouseEvent) {
    const targetPlayer = event.target as HTMLButtonElement;
    this.numberOfPlayers = Number(targetPlayer.innerText);
  }

  startGamePlayer() {
    this.gameService.setValue(true)
  }
}
