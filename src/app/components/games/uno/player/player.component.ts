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
import {NgForOf, NgStyle} from '@angular/common';
import { Deck } from '../services/uno/Deck';
import {TurnRound} from '../services/uno/TurnRound';
import {CardsContainerComponent} from '@components/games/uno/cards-container/cards-container.component';

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
  private extractDrawCardColor:string = "";

  constructor(private cdr: ChangeDetectorRef, private deck: Deck) {}

  ngOnInit() {
    this.validateFirstCardColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validateColorCard(changes);
    this.turnRoundOnClick(changes);

  }

  getCardTransform(index: number, totalCards: number): string {
    const rotation = (index - (totalCards - 1) / 2) * 2;
    return `rotate(${rotation}deg)`;
  }

  getCardZIndex(index: number): number {
    return index;
  }

  validateFirstCardColor(){
    if (this.getFirstCard && !this.isFirstCardUsed) {
      this.colorOfCardOutPut = this.extractCardColor(this.getFirstCard);
    }
  }

  validateColorCard(changes: SimpleChanges): void {
    if (changes["clickedCard"]?.currentValue && changes["clickedCard"].currentValue !== changes["clickedCard"].previousValue) {
      const newColor = this.extractCardColor(this.clickedCard);
      if (newColor) {
        this.colorOfCardOutPut = newColor;
      }
    }
  }

  turnRoundOnClick(changes: SimpleChanges): void {
    if (changes["turnRound"]?.currentValue) {
      if (changes["turnRound"].currentValue !== changes["turnRound"].previousValue) {
        this.nextTurn();
        this.drawCard(this.isPlayer2 ? this.player2 : this.player1);
      }
    }
  }

  discard1(card: string) {
    if (this.isPlayer2 && this.checkPlayerCardColor(this.player1)) {
      this.removeCard(this.player1, card);
      this.clickedCard = card;
      this.colorOfCardOutPut = this.extractCardColor(card);
      this.nextTurn();
    } else if (this.isPlayer2) {
      this.drawCard(this.player1);
    }
  }

  discard2(card: string) {
    if (!this.isPlayer2 && this.checkPlayerCardColor(this.player2)) {
      this.removeCard(this.player2, card);
      this.clickedCard = card;
      this.colorOfCardOutPut = this.extractCardColor(card);
      if (!this.checkPlayerHasCardColor(this.player2, card)){
        this.nextTurn();
      }
      console.log(this.colorOfCardOutPut);
    } else if (!this.isPlayer2) {
      this.drawCard(this.player2);
    }
  }

  checkPlayerHasCardColor(player: string, card: string): boolean {
    if (this.colorOfCardOutPut) {
      const playerCards = this.players[player];
      const extractCardColor = this.extractCardColor(card);
      for ( let i = 0; i < playerCards.length; i++ ) {
        const extractPlayerCardColor = this.extractCardColor(playerCards[i]);
        if (extractPlayerCardColor === extractCardColor) {
          console.log("extractPlayerCardColor", extractPlayerCardColor);
          console.log("extractCardColor", extractCardColor);
          return true;
        }
      }
    }
    return false;
  }

  checkPlayerCardColor(player: string): boolean {
    if (this.colorOfCardOutPut) {
      const playerCards = this.players[player];
      for ( let i = 0; i < playerCards.length; i++ ) {
        if (playerCards[i].includes(this.colorOfCardOutPut)){
          return true;
        }
      }
    }
    return false;
  }

  nextTurn() {
    this.isPlayer2 = !this.isPlayer2;
  }


  drawCard(player: string) {
    if (this.deck.getDeck().length > 0) {
      var card = this.deck.getDeck().shift();
      if (card) {
        this.players[player].push(card);
        this.extractDrawCardColor = this.extractCardColor(card);
        this.cdr.detectChanges();
      }

    }
    this.nextTurn();
  }

  private removeCard(player: string, card: string) {
    if (this.checkPlayerCardColor(player)) {
      const index = this.players[player].indexOf(card);
      if (index > -1) {
        this.players[player].splice(index, 1);
        this.players = { ...this.players };
        this.cdr.detectChanges();
        this.cardOutPut.emit(card);
      }
    } else {
      this.drawCard(player);
    }
  }
  private extractCardColor(card: string): string {
    if (!card) return "";

    for (const color of this.colors) {
      if (card.includes(color)) {
        return color;
      }
    }
    return "";
  }

  endRound() {
    const currentPlayer = this.isPlayer2 ? this.player2 : this.player1;

    const drawnCard = this.deck.getDeck().shift();
    if (drawnCard) {
      this.players[currentPlayer].push(drawnCard);
      this.cdr.detectChanges();

      if (this.extractCardColor(drawnCard) === this.colorOfCardOutPut) {
        this.removeCard(currentPlayer, drawnCard);
      }
    }
    this.nextTurn();
  }


}
