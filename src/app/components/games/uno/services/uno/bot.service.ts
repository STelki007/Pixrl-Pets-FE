import {CardService} from '@components/games/uno/services/uno/CardService';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BotService {

  constructor(private cardService: CardService) {
  }

  getCardPriority(card: string, opponentCardCount: number, bot: string, players: { [key: string]: string[] }): number {
    const special = this.cardService.extractSpecialCard(card);
    const color = this.cardService.extractCardColor(card);

    if (opponentCardCount === 1) {
      if (special === '4CardPlus') return 100;
      if (special === '2cards') return 90;
      if (special === 'Stop') return 80;
    }

    const preferredColor = this.getBotPreferredColor(bot, players);
    if (color === preferredColor) return 70;

    if (!special) return 50;

    if (special === 'ChangeColor' || special === '4CardPlus') return 30;

    return 10;
  }

  getBotPreferredColor(bot: string, players: { [key: string]: string[] }): string {
    const colorCount: { [color: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
      yellow: 0
    };

    for (const card of players[bot]) {
      const color = this.cardService.extractCardColor(card);
      if (color in colorCount) {
        colorCount[color]++;
      }
    }

    return Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])[0][0];
  }
}
