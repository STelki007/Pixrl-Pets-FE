import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { NgForOf } from '@angular/common';
import { Deck } from '../services/uno/Deck';
import {GameService} from '@components/games/uno/services/uno/GameService';

@Component({
  selector: 'app-player',
  imports: [NgForOf],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, OnChanges {
  @Output() cardOutPut = new EventEmitter<string>();
  @Output() drawCardReset = new EventEmitter<void>();

  @Input() players: { [key: string]: string[] } = {};
  @Input() clickedCard: string = "";
  @Input() getFirstCard: string = "";
  @Input() turnRound: boolean = false;
  @Input() drawCard: boolean = false;

  protected isPlayer2 = false;
  private colorOfCardOutPut: string = "";
  private colors = ["red", "green", "blue", "yellow"];

  private player1: string = "player1";
  private player2: string = "player2";

  constructor(private cdr: ChangeDetectorRef, private deck: Deck, private gameService: GameService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.handleGetFirstCard(changes)
    this.handleTurnRound(changes)
    this.handleDrawCard(changes)
  }

  handleGetFirstCard(changes: SimpleChanges) {
    if (changes['getFirstCard'] && changes['getFirstCard'].currentValue !== changes['getFirstCard'].previousValue) {
      this.colorOfCardOutPut = this.extractCardColor(this.getFirstCard);
      this.cdr.detectChanges();
      console.log("hier hat sich was geändert" + this.drawCard);
    }
  }

  handleDrawCard(changes: SimpleChanges) {
    if (changes['drawCard'] && changes['drawCard'].currentValue === true) {
      this.completeRound();
      this.drawCardReset.emit();
    }
  }

  handleTurnRound(changes: SimpleChanges): void {
    if (changes["turnRound"]?.currentValue !== changes["turnRound"]?.previousValue) {
      this.gameService.drawCardForPlayer(this.players, this.isPlayer2 ? this.player2 : this.player1);
      this.switchToNextPlayer();
    }
  }

  playCardIfValid(card: string, player: string): void {
    const isCurrentPlayer = (player === this.player1 && !this.isPlayer2) || (player === this.player2 && this.isPlayer2);
    if (!isCurrentPlayer) {
      console.log("Nicht dein Zug!");
      return;
    }

    if (!this.canPlayCard(card, this.getFirstCard)) {
      return;
    }

    console.log(this.colorOfCardOutPut)

    this.removeCardFromPlayer(player, card);
    this.clickedCard = card;
    this.getFirstCard = card;
    this.colorOfCardOutPut = this.extractCardColor(card);

    this.handleSpecialCard(card);
    if (this.checkWinner(player)) {

    }
    this.switchToNextPlayer();
  }

  private removeCardFromPlayer(player: string, card: string): void {
    const index = this.players[player].indexOf(card);
    if (index > -1) {
      this.players[player].splice(index, 1);
      this.players = { ...this.players };
      this.cdr.detectChanges();
      this.cardOutPut.emit(card);
    }
  }

  private handleSpecialCard(card: string): void {
    const special = this.extractSpecialCard(card);
    const nextPlayer = this.isPlayer2 ? this.player1 : this.player2;

    switch (special) {
      case "Stop":
        this.switchToNextPlayer();
        break;

      case "2cards":
        setTimeout(() => {
          this.gameService.drawCardForPlayer(this.players, nextPlayer);

        }, 300)

        setTimeout(() => {
          this.gameService.drawCardForPlayer(this.players, nextPlayer);

        }, 500)
        break;

      case "arrow":
        this.switchToNextPlayer();
        break;
    }
  }

  private canPlayCard(card: string, topCard: string): string | boolean {
    const cardColor = this.extractCardColor(card);
    const topColor = this.extractCardColor(topCard);

    const cardNumber = this.extractNumFromCard(card);
    const topNumber = this.extractNumFromCard(topCard);

    const cardSpecial = this.extractSpecialCard(card);
    const topSpecial = this.extractSpecialCard(topCard);

    return (
      cardColor === topColor ||
      (cardNumber !== null && cardNumber === topNumber) ||
      (cardSpecial && cardSpecial === topSpecial)
    );
  }

  private extractCardColor(card: string): string {
    if (!card) return "";
    return this.colors.find(color => card.includes(color)) || "";
  }

  private extractNumFromCard(card: string): number | null {
    if (!card) return null;
    const match = card.match(/(\d+)\.svg$/);
    return match ? parseInt(match[1], 10) : null;
  }

  private extractSpecialCard(card: string): string {
    if (!card) return "";
    if (card.includes("Stop")) return "Stop";
    if (card.includes("2cards")) return "2cards";
    if (card.includes("arrow")) return "arrow";
    return "";
  }

  switchToNextPlayer(): void {
    this.isPlayer2 = !this.isPlayer2;
  }

  getCardTransform(index: number, totalCards: number): string {
    const rotation = (index - (totalCards - 1) / 2) * 2;
    return `rotate(${rotation}deg)`;
  }

  getCardZIndex(index: number): number {
    return index;
  }


  private playerCanPlayAnyCard(player: string): boolean {
    const cards = this.players[player];
    return cards.some(card => this.canPlayCard(card, this.getFirstCard));
  }

  completeRound(): void {
    const currentPlayer = this.isPlayer2 ? this.player2 : this.player1;

    if (!this.playerCanPlayAnyCard(currentPlayer)){
      const drawnCard = this.deck.getDeck().shift();

      if (drawnCard) {
        this.players[currentPlayer].push(drawnCard);
        console.log(`${currentPlayer} zieht eine Karte: ${drawnCard}`);

        if (this.extractCardColor(drawnCard) === this.colorOfCardOutPut) {
          this.getFirstCard = drawnCard;
          // TODO
          if (this.playerCanPlayAnyCard(currentPlayer)){
              return;
          }
        }
      }
      this.drawCard = false;
      this.switchToNextPlayer();
    }else{
      this.drawCard = false;
      alert("Spieler kann doch spielen")
    }
  }

  checkPlayerHasCards(player: string): boolean {
    if (!(player in this.players)) {
      console.warn(`Spieler "${player}" existiert nicht.`);
      return false;
    }

    const cardCount = this.players[player].length;
    console.log(`${player} hat ${cardCount} Karten`);
    return cardCount > 0;
  }

  checkWinner(player: string): boolean {
    if (!this.checkPlayerHasCards(player)) {
      alert(`Spieler ${player} hat gewonnen!`);
      return true;
    }
    return false;
  }

}
