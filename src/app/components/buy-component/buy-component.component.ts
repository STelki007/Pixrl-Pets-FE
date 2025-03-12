import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-buy-component',
  imports: [NgForOf, NgClass],
  templateUrl: './buy-component.component.html',
  styleUrl: './buy-component.component.css'
})
export class BuyComponentComponent implements OnInit {
  private audio!: HTMLAudioElement;
  selectedTab: string = "buy";

  items = ['🐥', '👻', '🍖', '💰', '🎃', '🪙', '🛡️', '🔥', '🔑'];

  ngOnInit(): void {
    this.audio = new Audio("select-item.mp3");
    this.audio.load();
  }

  onClickItem() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
