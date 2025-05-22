import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {PlayerChatService} from '@components/games/uno/uno-player-chat/player.chat.service';

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

  constructor(private playerChatService: PlayerChatService) {
  }

  ngOnInit() {
    this.playerResponses = this.playerChatService.getPlayerMoves();
  }

  onSelectResponse(event: any) {
    const value = event.target.value;
  if (value) {
    this.dotInBotMessage();
    }
  }

  dotInBotMessage() {
    let count = 0;
    const interval = setInterval(() => {
      count++;

      if (count === 3) {
        clearInterval(interval);
        const cardId: string = this.playerChatService.getMoveIdByPlayerResponse(this.selectedResponse)!;
        this.botMessage = this.playerChatService.getBotResponse(cardId, this.selectedResponse)!;
      }
    }, 500);
  }



}
