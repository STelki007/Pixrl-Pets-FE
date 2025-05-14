import {Injectable, SimpleChanges} from '@angular/core';
import {Deck} from '@components/games/uno/services/uno/Deck';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private colors = ["red", "green", "blue", "yellow"];

  extractCardColor(card: string): string {
    if (!card) return "";
    return this.colors.find(color => card.includes(color)) || "";
  }

  extractNumFromCard(card: string): number | null {
    if (!card) return null;
    const match = card.match(/(\d+)\.svg$/);
    return match ? parseInt(match[1], 10) : null;
  }

  extractSpecialCard(card: string): string {
    const specials = ["Stop", "2cards", "arrow", "4CardPlus", "ChangeColor"];
    for (let special of specials) {
      if (card.toLowerCase().includes(special.toLowerCase())) {
        return special;
      }
    }
    return "";
  }

  checkIfChangeColorOr4PlusCard (card: string): boolean{
    const specials = ["4CardPlus", "ChangeColor"];
    for (let special of specials) {
      if (card.toLowerCase().includes(special.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

   canPlayCard(card: string, topCard: string): boolean | string {
    const cardColor = this.extractCardColor(card);
    const topColor = this.extractCardColor(topCard);

    const cardNumber = this.extractNumFromCard(card);
    const topNumber = this.extractNumFromCard(topCard);

    const cardSpecial = this.extractSpecialCard(card);
    const topSpecial = this.extractSpecialCard(topCard);

    if (cardSpecial === '4CardPlus' || cardSpecial === 'ChangeColor'){
      return true;
    }

    return (
      cardColor === topColor ||
      (cardNumber !== null && cardNumber === topNumber) ||
      (cardSpecial && cardSpecial === topSpecial)
    );
  }

  shuffleAgain(deck: Deck): void {
    const currentDeck = deck.getDeck();

    if (currentDeck.length <= 1) {
      const discardPile = deck.getDrawnCard();

      if (discardPile.length === 0) return;

      const newDeck = discardPile.slice(0, -1);
      this.shuffleArray(newDeck);

      deck.setDeck(newDeck);

      alert("Deck wurde neu gemischt.");
    }
  }

  private shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
