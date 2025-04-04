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
    console.log(this.extractNumFromCard(card));
    console.log(this.players)

    const isCurrentPlayer = (player === this.player1 && this.isPlayer2) || (player === this.player2 && !this.isPlayer2);
    const cardColor = this.extractCardColor(card);
    const extractNumFromCard = this.extractNumFromCard(card);
    const extractNumFromCardOutPut = this.extractNumFromCard(this.colorOfCardOutPut);

    console.log(extractNumFromCardOutPut + " extractNumFromCardOutPut");
    console.log(extractNumFromCard + " extractNumFromCard");

    if (!isCurrentPlayer) {
      console.log("Nicht deinen Zug!")
      return;
    }

    if (!this.playerCanPlayColor(player)) {
      this.drawCardForPlayer(player);
      return;
    }

    if (cardColor === this.colorOfCardOutPut || extractNumFromCard === extractNumFromCardOutPut) {
      this.removeCardFromPlayer(player, card);
      this.clickedCard = card;
      this.colorOfCardOutPut = cardColor;
      this.switchToNextPlayer();
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

  private extractCardColor(card: string): string {
    if (!card) return "";
    return this.colors.find(color => card.includes(color)) || "";
  }

  switchToNextPlayer() {
    this.isPlayer2 = !this.isPlayer2;

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
