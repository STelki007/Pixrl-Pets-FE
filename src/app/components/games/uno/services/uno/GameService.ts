import {ChangeDetectorRef, Injectable} from '@angular/core';
import { Deck } from './Deck';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private deck: Deck) {}

  drawCardForPlayer(players: { [key: string]: string[] }, player: string): void {
    if (this.deck.getDeck().length === 0) return;

    const card = this.deck.getDeck().shift();
    if (card) {
      players[player].push(card);
    }
  }
}
