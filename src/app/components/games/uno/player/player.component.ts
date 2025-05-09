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
import {CardAnimation} from '@components/games/uno/services/uno/CardAnimation';
import {PickColorComponent} from '@components/games/uno/pick-color/pick-color.component';
import {PickColorService} from '@services/pickColor/PickColorService';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';
import {CardService} from '@components/games/uno/services/uno/CardService';
import {SoundService} from '@services/SoundService';

@Component({
  selector: 'app-player',
  imports: [NgForOf, PickColorComponent],
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
  protected colorSelected: string = "";

  private colorOfCardOutPut: string = "";
  private player1: string = "player1";
  private player2: string = "player2";
  private isWaitingForColorPick: boolean = false;


  constructor(
    private cdr: ChangeDetectorRef,
    private deck: Deck,
    private gameService: GameService,
    private cardAnimation: CardAnimation,
    private pickColorService: PickColorService,
    private unoGameService: UnoGameStart,
    private cardService: CardService,
    private soundService: SoundService,
  ) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleGetFirstCard(changes)
    this.handleTurnRound(changes)
  }

  handleGetFirstCard(changes: SimpleChanges) {
    if (changes['getFirstCard'] && changes['getFirstCard'].currentValue !== changes['getFirstCard'].previousValue) {
      this.colorOfCardOutPut = this.cardService.extractCardColor(this.getFirstCard);
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
    this.shuffelAgain()
    const isCurrentPlayer = (player === this.player1 && !this.isPlayer2) || (player === this.player2 && this.isPlayer2);

    if (!isCurrentPlayer) return;

    if (!this.cardService.canPlayCard(card, this.getFirstCard)) return;

    this.soundService.playSound("card-pick.mp3");
    this.removeCardFromPlayer(player, card);
    this.clickedCard = card;
    this.getFirstCard = card;
    this.colorOfCardOutPut = this.cardService.extractCardColor(card);

    this.handleSpecialCard(card);
    if (this.checkWinner(player)) {
      return;
    }
    this.switchToNextPlayer();
    this.unoLastCardReset.emit();
    console.log(this.deck.getDrawnCard())
  }

  private removeCardFromPlayer(player: string, card: string): void {
    const index = this.players[player].indexOf(card);
    if (index > -1) {
      this.deck.drawnCards(card)
      this.players[player].splice(index, 1);
      this.players = { ...this.players };
      this.cdr.detectChanges();
      this.cardOutPut.emit(card);
    }
  }

  private handleSpecialCard(card: string): void {
    const special = this.cardService.extractSpecialCard(card);
    console.log("extractSpecialCard returns:", special);

    const nextPlayer = this.isPlayer2 ? this.player1 : this.player2;

    switch (special) {
      case "Stop":
        this.manageDelayCardSpeed(500)
        break;

      case "2cards":
        this.gameService.drawMultipleCards(nextPlayer, this.players, 2);
        this.manageDelayCardSpeed(1000)
        break;

      case "arrow":
        this.manageDelayCardSpeed(500)
        break;

      case "4CardPlus":
        this.gameService.drawMultipleCards(nextPlayer, this.players, 4);
        this.isWaitingForColorPick = true;
        this.pickColorService.setValue(true);
        break;

      case "ChangeColor":
        this.pickColorService.setValue(true);
        this.isWaitingForColorPick = true;
        break;
    }
  }

  private manageDelayCardSpeed (delaySpeed: number): void{
    setTimeout(() => this.switchToNextPlayer(), delaySpeed);
  }

  private switchToNextPlayer(): void {
    if (this.isWaitingForColorPick) return;

    this.isPlayer2 = !this.isPlayer2;

    if (!this.isPlayer2) {
      setTimeout(() => this.performBotTurn(), 1000);
    }
  }

  private performBotTurn(): void {
    const bot = this.player1;

    const tryPlayOrDraw = () => {
      const hand = this.players[bot];
      const playableCards = hand.filter(card => this.cardService.canPlayCard(card, this.getFirstCard));

      if (playableCards.length > 0) {
        const bestCard = playableCards.sort((a, b) =>
          this.getCardPriority(b, this.players[this.player2]?.length || 0) -
          this.getCardPriority(a, this.players[this.player2]?.length || 0)
        )[0];

        if (bestCard) {
          this.playCardIfValid(bestCard, bot);
        }
        return;
      }

      let drawnCard = this.deck.getDeck().shift();
      this.deck.getDeck().push(drawnCard!);

      if (!drawnCard) {
        this.switchToNextPlayer();
        return;
      }

      this.soundService.playSound("card-draw.mp3");
      this.players[bot].push(drawnCard);
      this.cardAnimation.animateDrawCard(false, this.backCard);
      this.cdr.detectChanges();

      if (this.cardService.canPlayCard(drawnCard, this.getFirstCard)) {
        setTimeout(() => this.playCardIfValid(drawnCard!, bot), 1000);
      } else {
        setTimeout(() => tryPlayOrDraw(), 800);
      }
    };

    tryPlayOrDraw();
  }

  private getCardPriority(card: string, opponentCardCount: number): number {
    const special = this.cardService.extractSpecialCard(card);
    const color = this.cardService.extractCardColor(card);

    if (opponentCardCount === 1) {
      if (special === '4CardPlus') return 100;
      if (special === '2cards') return 90;
      if (special === 'Stop') return 80;
    }

    const preferredColor = this.getBotPreferredColor();
    if (color === preferredColor) return 70;

    if (!special) return 50;

    if (special === 'ChangeColor' || special === '4CardPlus') return 30;

    return 10;
  }

  private getBotPreferredColor(): string {
    const colorCount: { [color: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
      yellow: 0
    };

    const bot = this.player1;
    for (const card of this.players[bot]) {
      const color = this.cardService.extractCardColor(card);
      if (color in colorCount) {
        colorCount[color]++;
      }
    }

    return Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  getCardTransform(index: number, totalCards: number): string {
    const rotation = (index - (totalCards - 1) / 2) * 2;
    return `rotate(${rotation}deg)`;
  }

  getCardZIndex(index: number): number {
    return index;
  }

  onCompleteRoundClick(): void {
    this.shuffelAgain()
    const currentPlayer = this.isPlayer2 ? this.player2 : this.player1;

    const playableCards = this.players[currentPlayer].filter(card => this.cardService.canPlayCard(card, this.getFirstCard));

    if (playableCards.length > 0) {
      return;
    }

    const drawnCard = this.deck.getDeck().shift();
    if (drawnCard) {
      this.soundService.playSound("card-draw.mp3");
      const isAnimation: boolean = currentPlayer === this.player2;
      this.players[currentPlayer].push(drawnCard);
      this.cardAnimation.animateDrawCard(isAnimation, this.backCard);
      this.cdr.detectChanges();
    } else {
      this.shuffelAgain()
    }
  }

  shuffelAgain(): void {
    const currentDeck = this.deck.getDeck();

    if (currentDeck.length <= 1) {
      const discardPile = this.deck.getDrawnCard();

      if (discardPile.length === 0) return;

      const newDeck = discardPile.slice(0, -1);
      this.shuffleArray(newDeck);

      this.deck.setDeck(newDeck);

      alert("Deck wurde neu gemischt.");
    }
  }

  private shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  playerHasNoCards(player: string): boolean {
    return this.players[player]?.length === 0;
  }

  checkWinner(player: string): boolean {
    if (this.playerHasNoCards(player)) {
      if (this.checkPlayerPressedUno()) {
        alert(`Spieler ${player} hat gewonnen!`);
        this.unoGameService.setValue(false)
        this.pickColorService.setValue(false)
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

  handleColorSelected(color: string) {
    this.colorSelected = color;
    this.colorOfCardOutPut = this.colorSelected;
    this.getFirstCard = this.colorSelected;

    this.cardOutPut.emit(this.colorOfCardOutPut);
    this.isWaitingForColorPick = false;

    setTimeout(() => this.switchToNextPlayer(), 1000);
  }

}
