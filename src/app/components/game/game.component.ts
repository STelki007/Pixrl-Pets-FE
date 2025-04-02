import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [
    NgForOf
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  items = Array(6).fill(0);
  private gameClickAudio = HTMLAudioElement;

  ngOnInit(): void {
    this.gameClickAudio = new Audio("select-item.mp3");
    this.gameClickAudio.volume = 1;
  }

  onAnimalCardClick() {
    this.gameClickAudio.currentTime = 0;
    this.gameClickAudio.play();
  }
}
