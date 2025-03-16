import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {audit} from 'rxjs';

@Component({
  selector: 'app-inventar-component',
  imports: [
    NgForOf
  ],
  templateUrl: './inventar-component.html',
  styleUrl: './inventar-component.css'
})
export class InventarComponent implements OnInit {
  private audio!: HTMLAudioElement;

  items = [
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀']
  ];

  ngOnInit(): void {
    this.audio = new Audio("select-item.mp3");
    this.audio.load();
  }


  onClickItem() {
    this.audio.currentTime = 0;
    this.audio.play();
  }


}
