import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sell-component',
  imports: [
    NgForOf
  ],
  templateUrl: './sell-component.component.html',
  styleUrl: './sell-component.component.css'
})
export class SellComponentComponent implements OnInit {
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
