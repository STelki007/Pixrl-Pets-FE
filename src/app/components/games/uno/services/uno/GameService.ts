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

}
