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
    const preferredColor = this.getBotPreferredColor(bot, players);

    let score = 0;
    if (special === '4CardPlus') score += 50;
    else if (special === '2cards') score += 40;
    else if (special === 'Stop') score += 30;

    if (color === preferredColor) score += 20;
    if (!special) score += 10;

    if (opponentCardCount <= 2) score += 30;

    return score;
  }

  getBotPreferredColor(bot: string, players: { [key: string]: string[] }): string {
    const colorCount: { [color: string]: number } = { red: 0, green: 0, blue: 0, yellow: 0 };
    for (const card of players[bot]) {
      const color = this.cardService.extractCardColor(card);
      if (color in colorCount) colorCount[color]++;
    }
    return Object.entries(colorCount).sort((a, b) => b[1] - a[1])[0][0];
  }

}
