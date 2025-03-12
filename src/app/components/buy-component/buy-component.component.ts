import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-buy-component',
  imports: [
    NgForOf
  ],
  templateUrl: './buy-component.component.html',
  styleUrl: './buy-component.component.css'
})
export class BuyComponentComponent implements OnInit {
  private audio!: HTMLAudioElement;
  items = [
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀']
  ];

  ngOnInit(): void {
    this.audio = new Audio("select-item.mp3");
    this.audio.load()
  }

  onClickItem() {
    this.audio.currentTime = 0;
    this.audio.play()
  }


}

