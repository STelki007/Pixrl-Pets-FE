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
import {NgForOf, NgIf} from '@angular/common';
import { Deck } from '../services/uno/Deck';
import {GameService} from '@components/games/uno/services/uno/GameService';
import {CardAnimation} from '@components/games/uno/services/uno/CardAnimation';
import {PickColorComponent} from '@components/games/uno/pick-color/pick-color.component';
import {PickColorService} from '@services/pickColor/PickColorService';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';
import {CardService} from '@components/games/uno/services/uno/CardService';
import {SoundService} from '@services/SoundService';
import {FormsModule} from '@angular/forms';
import {BotService} from '@components/games/uno/services/uno/bot.service';
import {UnoPlayerChatComponent} from '@components/games/uno/uno-player-chat/uno-player-chat.component';
import {PlayerWinsUnoService} from '@components/games/uno/services/uno/player-wins-uno.service';
import {PlayerWinsTicTacToService} from '@components/games/tic-tac-toe/services/player.wins.tic.tac.to.service';

@Component({
  selector: 'app-player',
  imports: [NgForOf, PickColorComponent, FormsModule, UnoPlayerChatComponent],
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
  private bot: string = "player1";
  private player: string = "player2";
  private isWaitingForColorPick: boolean = false;
  private pressUnoButton: boolean = false;
  private showChangeColorModal: boolean = false;


  constructor(
    private cdr: ChangeDetectorRef,
    private deck: Deck,
    private gameService: GameService,
    private cardAnimation: CardAnimation,
    private pickColorService: PickColorService,
    private unoGameService: UnoGameStart,
    private cardService: CardService,
    private soundService: SoundService,
    private botService: BotService,
    private playerWinsService: PlayerWinsTicTacToService,
  ) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleGetFirstCard(changes)
    this.handleTurnRound(changes)
    this.pressUnoButton = this.unoLastCard;

  }

  handleGetFirstCard(changes: SimpleChanges) {
    if (changes['getFirstCard'] && changes['getFirstCard'].currentValue !== changes['getFirstCard'].previousValue) {
      this.colorOfCardOutPut = this.cardService.extractCardColor(this.getFirstCard);
      this.cdr.detectChanges();
    }
  }

  handleTurnRound(changes: SimpleChanges): void {
    if (changes["turnRound"]?.currentValue !== changes["turnRound"]?.previousValue) {
      this.gameService.drawCardForPlayer(this.players, this.isPlayer2 ? this.player : this.bot, 1);
      this.switchToNextPlayer();
    }
  }

  playCardIfValid(card: string, player: string): void {
    this.cardService.shuffleAgain(this.deck)
    const isCurrentPlayer = (player === this.bot && !this.isPlayer2) || (player === this.player && this.isPlayer2);

    if (!isCurrentPlayer) return;

    if (!this.cardService.canPlayCard(card, this.getFirstCard)) return;

    this.soundService.playSound("card-pick.mp3");
    this.removeCardFromPlayer(player, card);
    this.clickedCard = card;
    this.getFirstCard = card;
    this.colorOfCardOutPut = this.cardService.extractCardColor(card);

    this.handleSpecialCard(card);

    if (this.checkWinner(player)) return;

    if (!this.isWaitingForColorPick) {
      this.switchToNextPlayer();
    }

    this.unoLastCardReset.emit();
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

    const nextPlayer = this.isPlayer2 ? this.bot : this.player;

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

        if (this.isPlayer2) {
          this.pickColorService.setValue(true);
        }
        break;

      case "ChangeColor":
        this.isWaitingForColorPick = true;

        if (this.isPlayer2) {
          this.pickColorService.setValue(true);
        }
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

  private botPickColor(): string {
    return this.botService.getBotPreferredColor(this.bot, this.players);
  }

  private performBotTurn(): void {
    const tryPlayOrDraw = () => {
      const hand = this.players[this.bot];
      this.pressUnoButton = hand.length <= 1;

      const playableCards = hand.filter(card => this.cardService.canPlayCard(card, this.getFirstCard));

      if (playableCards.length > 0) {
        const bestCard = playableCards.sort((a, b) =>
          this.botService.getCardPriority(b, this.players[this.player]?.length || 0, this.bot, this.players) -
          this.botService.getCardPriority(a, this.players[this.player]?.length || 0, this.bot, this.players)
        )[0];

        if (bestCard) {
          const isColorChangeCard = bestCard.includes('ChangeColor') || bestCard.includes('4CardPlus');

          this.playCardIfValid(bestCard, this.bot);

          if (isColorChangeCard) {
            setTimeout(() => {
              const bestColor = this.botPickColor();
              this.handleColorSelected(bestColor);
            }, 800);
          }
          return;
        }


        return;
      }

      const drawnCard = this.deck.getDeck().shift();

      if (!drawnCard) {
        this.switchToNextPlayer();
        return;
      }

      this.soundService.playSound("card-draw.mp3");
      this.players[this.bot].push(drawnCard);
      this.cardAnimation.animateDrawCard(false, this.backCard);
      this.cdr.detectChanges();

      if (this.cardService.canPlayCard(drawnCard, this.getFirstCard)) {
        setTimeout(() => this.playCardIfValid(drawnCard!, this.bot), 1000);
      } else {
        setTimeout(() => this.switchToNextPlayer(), 800);
      }
    };

    tryPlayOrDraw();
  }

  getCardTransform(index: number, totalCards: number): string {
    const rotation = (index - (totalCards - 1) / 2) * 2;
    return `rotate(${rotation}deg)`;
  }

  getCardZIndex(index: number): number {
    return index;
  }

  onCompleteRoundClick(): void {
    this.cardService.shuffleAgain(this.deck)
    const currentPlayer = this.isPlayer2 ? this.player : this.bot;

    const playableCards = this.players[currentPlayer].filter(card => this.cardService.canPlayCard(card, this.getFirstCard));

    if (playableCards.length > 0) {
      alert("Du hast gültige Karte in der Hand");
      return;
    }

    const drawnCard = this.deck.getDeck().shift();

    if (!drawnCard) {
      this.cardService.shuffleAgain(this.deck);
      return;
    }

    this.soundService.playSound("card-draw.mp3");

    this.players[currentPlayer].push(drawnCard);

    const isAnimation: boolean = currentPlayer === this.player;
    this.cardAnimation.animateDrawCard(isAnimation, this.backCard);
    this.cdr.detectChanges();

    if (!this.cardService.canPlayCard(drawnCard, this.getFirstCard)) {
      this.switchToNextPlayer();
    }
  }

  playerHasNoCards(player: string): boolean {
    return this.players[player]?.length === 0;
  }

  checkWinner(player: string): boolean {
    if (this.playerHasNoCards(player)) {
      if (this.checkPlayerPressedUno()) {

        if (player === this.player) {
          this.playerWinsService.setValue(true)
          alert('Spieler hat gewonnen!');
        } else if (player === this.bot) {
          alert('Bot hat gewonnen!');
        }

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
    return this.pressUnoButton;
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
