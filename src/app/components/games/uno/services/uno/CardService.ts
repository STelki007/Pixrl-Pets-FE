import {Injectable, SimpleChanges} from '@angular/core';

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

   canPlayCard(card: string, topCard: string): string | boolean {
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

  randomColor (): string{
    const randomIndexOfColor = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndexOfColor];
  }

}
