import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {UnoChatService} from '@components/games/uno/uno-player-chat/player.chat.service';


@Component({
  selector: 'app-uno-player-chat',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './uno-player-chat.component.html',
  styleUrl: './uno-player-chat.component.css'
})
export class UnoPlayerChatComponent implements OnInit {
  botMessage: string = '...';
  selectedResponse: string = '';
  playerResponses: string[] = []

  constructor(private unoChatService: UnoChatService) {
  }

  ngOnInit() {
    this.playerResponses = this.unoChatService.getPlayerMoves();
  }

  async onSelectResponse(event: any) {
    const value = event.target.value;
    if (!value) return;

    this.selectedResponse = value;
    try {
      await this.botAnswers();
      await this.playerAnswersPossibilities();
    } catch (e) {
      console.error("Fehler beim Antworten:", e);
    }
  }


  async botAnswers() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const cardId: string = this.unoChatService.getBotChatByPlayerResponse(this.selectedResponse)!;
        this.botMessage = this.unoChatService.getBotResponse(cardId, this.selectedResponse)!;
        resolve();
      }, 1000);
    });
  }


  async playerAnswersPossibilities () {
    const cardId: string = this.unoChatService.getPlayerByBotResponse(this.botMessage)!;
    const playerMessagePossibilities = this.unoChatService.getPlayerResponse(cardId);
    if (playerMessagePossibilities){
      this.playerResponses = playerMessagePossibilities;
    }
  }



}
