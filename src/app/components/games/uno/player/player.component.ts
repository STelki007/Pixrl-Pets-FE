import {
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { Deck } from '../services/uno/Deck';
import {GameService} from '@components/games/uno/services/uno/GameService';
import gsap from 'gsap';
import {CardAnimation} from '@components/games/uno/services/uno/CardAnimation';

@Component({
  selector: 'app-player',
  imports: [NgForOf],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, OnChanges {
  @Output() cardOutPut = new EventEmitter<string>();
  @Output() unoLastCardReset = new EventEmitter<void>();

  @Input() players: { [key: string]: string[] } = {};
  @Input() clickedCard: string = "";
  @Input() getFirstCard: string = "";
  @Input() turnRound: boolean = false;
  @Input() unoLastCard: boolean = false;

  @ViewChild('backCard', { static: true }) backCard!: ElementRef;

  protected isPlayer2 = false;
  private colorOfCardOutPut: string = "";
  private colors = ["red", "green", "blue", "yellow"];

  private player1: string = "player1";
  private player2: string = "player2";

  constructor(
    private cdr: ChangeDetectorRef,
    private deck: Deck,
    private gameService: GameService,
    private cardAnimation: CardAnimation,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.handleGetFirstCard(changes)
    this.handleTurnRound(changes)
  }

  handleGetFirstCard(changes: SimpleChanges) {
    if (changes['getFirstCard'] && changes['getFirstCard'].currentValue !== changes['getFirstCard'].previousValue) {
      this.colorOfCardOutPut = this.extractCardColor(this.getFirstCard);
      this.cdr.detectChanges();
    }
  }

  handleTurnRound(changes: SimpleChanges): void {
    if (changes["turnRound"]?.currentValue !== changes["turnRound"]?.previousValue) {
      this.gameService.drawCardForPlayer(this.players, this.isPlayer2 ? this.player2 : this.player1, 1);
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
      return;
    }
    this.switchToNextPlayer();
    this.unoLastCardReset.emit();
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
        this.drawMultipleCards(nextPlayer, 2);
        break;

      case "arrow":
        this.switchToNextPlayer();
        break;
    }
  }

  private drawMultipleCards(player: string, count: number, delay = 300): void {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.gameService.drawCardForPlayer(this.players, player, 1);
      }, delay * (i + 1));
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

  onCompleteRoundClick(): void {
    const currentPlayer = this.isPlayer2 ? this.player2 : this.player1;
    const drawCardForPlayerAnimation = currentPlayer === this.player2;

    if (!this.playerCanPlayAnyCard(currentPlayer)){
      const drawnCard = this.deck.getDeck().shift();

      if (drawnCard) {
        this.cardAnimation.animateDrawCard(drawCardForPlayerAnimation, this.backCard)
        this.players[currentPlayer].push(drawnCard);
        console.log(`${currentPlayer} zieht eine Karte: ${drawnCard}`);

        if (this.extractCardColor(drawnCard) === this.colorOfCardOutPut) {
          this.getFirstCard = drawnCard;
          if (this.playerCanPlayAnyCard(currentPlayer)) return;
        }
      }
      this.switchToNextPlayer();
    }else{
      alert("Spieler kann doch spielen")
    }
  }

  playerHasNoCards(player: string): boolean {
    return this.players[player]?.length === 0;
  }

  checkWinner(player: string): boolean {
    if (this.playerHasNoCards(player)) {
      if (this.checkPlayerPressedUno()) {
        alert(`Spieler ${player} hat gewonnen!`);
        return true;
      } else {
        alert(`Spieler ${player} hat UNO nicht gedrückt und bekommt 2 Strafkarten!`);
        this.gameService.drawCardForPlayer(this.players, player, 2);
      }
    }
    return false;
  }

  checkPlayerPressedUno (): boolean {
    return this.unoLastCard;
  }


}
