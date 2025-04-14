import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NgForOf} from '@angular/common';
import { Deck } from '../services/uno/Deck';
import {getMatIconFailedToSanitizeLiteralError} from '@angular/material/icon';

@Component({
  selector: 'app-player',
  imports: [NgForOf],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() players: { [key: string]: string[] } = {};
  @Output() cardOutPut = new EventEmitter<string>();
  @Input() clickedCard: string = "";
  @Input() getFirstCard: string = "";
  @Input() turnRound = false;

  protected isPlayer2 = false;
  private colorOfCardOutPut: string = "";
  private colors = ["red", "green", "blue", "yellow"];
  private isFirstCardUsed = false;
  private player1: string = "player1";
  private player2: string = "player2";
  private extractDrawCardColor: string = "";

  constructor(private cdr: ChangeDetectorRef, private deck: Deck) {}

  ngOnInit() {
    this.initializeFirstCardColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateClickedCardColor(changes);
    this.handleTurnChange(changes);
  }

  getCardTransform(index: number, totalCards: number): string {
    const rotation = (index - (totalCards - 1) / 2) * 2;
    return `rotate(${rotation}deg)`;
  }

  getCardZIndex(index: number): number {
    return index;
  }

  initializeFirstCardColor() {
    if (this.getFirstCard && !this.isFirstCardUsed) {
      this.colorOfCardOutPut = this.extractCardColor(this.getFirstCard);
      this.isFirstCardUsed = true;
    }
  }

  updateClickedCardColor(changes: SimpleChanges): void {
    if (changes["clickedCard"]?.currentValue && changes["clickedCard"].currentValue !== changes["clickedCard"].previousValue) {
      const newColor = this.extractCardColor(this.clickedCard);
      if (newColor) {
        this.colorOfCardOutPut = newColor;
      }
    }
  }

  handleTurnChange(changes: SimpleChanges): void {
    if (changes["turnRound"]?.currentValue !== changes["turnRound"]?.previousValue) {
      this.drawCardForPlayer(this.isPlayer2 ? this.player2 : this.player1);
      this.switchToNextPlayer();
    }
  }

  playerCanPlayColor(player: string): boolean {
    return this.players[player]?.some(card => this.extractCardColor(card) === this.colorOfCardOutPut);
  }

  playCardIfValid(card: string, player: string) {
    const getPlayer = this.players[player];
    const isCurrentPlayer = (player === this.player1 && this.isPlayer2) || (player === this.player2 && !this.isPlayer2);
    const cardColor = this.extractCardColor(card);
    const cardNumber = this.extractNumFromCard(card);

    if (!isCurrentPlayer) {
      console.log("Nicht deinen Zug!");
      return;
    }

    if (!this.playerCanPlayAnyCard(player)) {
      this.drawCardForPlayer(player);
      return;
    }

    const canPlayByNumber =
      cardNumber !== null &&
      this.extractNumFromCard(this.getFirstCard) !== null &&
      cardNumber === this.extractNumFromCard(this.getFirstCard);

    if (this.canPlayCard(card, this.getFirstCard)) {
      this.removeCardFromPlayer(player, card);
      this.clickedCard = card;
      this.getFirstCard = card;
      this.colorOfCardOutPut = this.extractCardColor(card);

      this.handleSpecialCard(card);

      this.switchToNextPlayer();
      console.log("Letzte gespielte Karte:", this.getFirstCard);
    }

  }

  drawCardForPlayer(player: string) {
    if (this.deck.getDeck().length === 0) {
      console.warn("Das Deck ist leer! Karte kann nicht gezogen werden.");
      return;
    }

    const card = this.deck.getDeck().shift();
    if (card) {
      this.players[player].push(card);
      this.extractDrawCardColor = this.extractCardColor(card);
      this.cdr.detectChanges();
    }

    if (this.extractDrawCardColor !== this.colorOfCardOutPut) {
      this.switchToNextPlayer();
    }
  }

  private removeCardFromPlayer(player: string, card: string) {
    const index = this.players[player].indexOf(card);
    if (index > -1) {
      this.players[player].splice(index, 1);
      this.players = { ...this.players };
      this.cdr.detectChanges();
      this.cardOutPut.emit(card);
    }
  }

  extractSpecialCard(card: string): string {
    if (!card) return "";
    if (card.includes('Stop')) return "Stop";
    if (card.includes('2cards')) return "2cards";
    if (card.includes('arrow')) return "arrow";
    return "";
  }

  private handleSpecialCard(card: string) {
    const special = this.extractSpecialCard(card);

    switch (special) {
      case "Stop":
        console.log("Sonderregel: STOP");
        this.switchToNextPlayer();
        break;

      case "2cards":
        console.log("Sonderregel: +2 Karten");

        const nextPlayer = this.isPlayer2 ? this.player2 : this.player1;
        this.drawCardForPlayer(nextPlayer);
        this.drawCardForPlayer(nextPlayer);

        this.switchToNextPlayer();
        break;

      case "arrow":
        console.log("Sonderregel: Richtungswechsel");
        this.switchToNextPlayer();
        break;

      default:
        break;
    }
  }

  private canPlayCard(card: string, topCard: string): boolean {
    const cardColor = this.extractCardColor(card);
    const cardNumber = this.extractNumFromCard(card);
    const topColor = this.extractCardColor(topCard);
    const topNumber = this.extractNumFromCard(topCard);

    const specialCard = this.extractSpecialCard(card);
    const topSpecialCard = this.extractSpecialCard(topCard);

    const isSpecialMatch = specialCard !== "" && specialCard === topSpecialCard;
    const isColorMatch = cardColor === topColor;
    const isNumberMatch = cardNumber !== null && cardNumber === topNumber;

    return isColorMatch || isNumberMatch || isSpecialMatch;
  }

  private extractCardColor(card: string): string {
    if (!card) return "";
    return this.colors.find(color => card.includes(color)) || "";
  }

  switchToNextPlayer() {
    this.isPlayer2 = !this.isPlayer2;

  }

  hasPlayerSameCardNumber(player: string[], card: string): boolean {
    const playerNumbers = this.extractArrNumFromPlayer(player);
    const cardNumber = this.extractNumFromCard(card);

    console.log("playerNumbers", playerNumbers);
    console.log("cardNumber", cardNumber);

    if (!playerNumbers || cardNumber === null) return false;

    return playerNumbers.includes(cardNumber);
  }

  private playerCanPlayAnyCard(player: string): boolean {
    const cards = this.players[player];
    const topCardNumber = this.extractNumFromCard(this.getFirstCard);
    const topCardColor = this.colorOfCardOutPut;

    console.log("Aktuelle Karte auf dem Tisch:", this.getFirstCard);
    console.log("Top-Kartenfarbe:", topCardColor);
    console.log("Top-Kartennummer:", topCardNumber);

    return cards.some(card => {
      const cardColor = this.extractCardColor(card);
      const cardNumber = this.extractNumFromCard(card);

      console.log("Spielerkarte:", card, " | Farbe:", cardColor, " | Nummer:", cardNumber);

      const colorMatches = cardColor === topCardColor;
      const numberMatches = cardNumber === topCardNumber;

      return colorMatches || numberMatches;
    });
  }

  private extractArrNumFromPlayer(playerCard: string[]): (number | null)[] | null {
    if (!playerCard) return null;

    return playerCard.map(card => {
      const match = card.match(/(\d+)\.svg$/);
      return match ? parseInt(match[1], 10) : null;
    });
  }

  private extractNumFromCard(card: string): number | null {
    if (!card) return null;

    const match = card.match(/(\d+)\.svg$/);
    return match ? parseInt(match[1], 10) : null;
  }

  completeRound() {
    const currentPlayer = this.isPlayer2 ? this.player2 : this.player1;
    const drawnCard = this.deck.getDeck().shift();

    if (drawnCard) {
      this.players[currentPlayer].push(drawnCard);
      console.log(`${currentPlayer} zieht eine Karte: ${drawnCard}`);

      if (this.extractCardColor(drawnCard) === this.colorOfCardOutPut) {
        this.removeCardFromPlayer(currentPlayer, drawnCard);
      }
      this.switchToNextPlayer();
    }
  }
}
