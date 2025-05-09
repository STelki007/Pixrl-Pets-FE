import {ChangeDetectorRef, Injectable} from '@angular/core';
import { Deck } from './Deck';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private deck: Deck) {}

   drawCardForPlayer(players: { [key: string]: string[] }, player: string, count: number): void {
    if (this.deck.getDeck().length === 0) return;

    for (let i = 0; i < count; i++) {
      const card = this.deck.getDeck().shift();
      if (card) {
        players[player].push(card);
      }
    }
  }

  drawMultipleCards(player: string, players: { [key: string]: string[] }, count: number, delay = 300): void {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.drawCardForPlayer(players, player, 1);
      }, delay * (i + 1));
    }
  }

   shuffleDeck(deckArray: string[]): void {
    for (let i = deckArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [deckArray[i], deckArray[random]] = [deckArray[random], deckArray[i]];
    }
  }



}
