import {Component, OnInit} from '@angular/core';
import {CardsContainerComponent} from '../cards-container/cards-container.component';
import {PlayerComponent} from '../player/player.component';
import {GameStartComponent} from '../game-start/game-start.component';
import {NgIf} from '@angular/common';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';

@Component({
  selector: 'app-main-view',
  imports: [
    CardsContainerComponent,
    PlayerComponent,
    GameStartComponent,
    NgIf
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {
  protected isGameStart = false;
  protected players: { [key: string]: string[] } = {};
  protected firstCardOpeningInput: string = "";
  protected getCardOutPut: string = "";
  protected turnEnd: boolean = false;
  protected unoLastCard: boolean = false;


  constructor(private gameService: UnoGameStart) {}

  ngOnInit(): void {
    this.gameService.getValue().subscribe(value => {
      this.isGameStart = value;
    });
  }


  updatePlayers(players: { [key: string]: string[] }) {
    this.players = players;
  }

  handleFirstCardOpening(firstCard: string) {
    this.firstCardOpeningInput = firstCard;
  }

  handleGetCardOutPut (cardOutPut: string){
  this.getCardOutPut = cardOutPut;
  }

  handleTurnEnd (turnEnd: boolean) {
    this.turnEnd = turnEnd;
  }

  handleUnoLastCard(): void {
    this.unoLastCard = true;
  }

  resetUnoLastCard(): void {
    this.unoLastCard = false;
  }


}
