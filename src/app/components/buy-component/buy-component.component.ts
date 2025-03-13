import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-buy-component',
  imports: [NgForOf, NgClass],
  templateUrl: './buy-component.component.html',
  styleUrl: './buy-component.component.css'
})
export class BuyComponentComponent implements OnInit {
  private selectItem!: HTMLAudioElement;
  private  switchButton!: HTMLAudioElement;
  selectedTab: string = "buy";

  items = ['🐥', '👻', '🍖', '💰', '🎃', '🪙', '🛡️', '🔥', '🔑', '👻', '🍖', '💰', '🎃', '🪙', '🛡️', '🔥', '🔑', '👻', '🍖', '💰', '🎃', '🪙', '🛡️', '🔥', '🔑'];

  ngOnInit(): void {
    this.selectItem = new Audio("select-item.mp3"); this.selectItem.load(); this.selectItem.volume = 1;
    this.switchButton = new Audio("cabinet-door.mp3"); this.switchButton.load(); this.switchButton.volume = 1;
  }

  onClickItem() {
    this.selectItem.currentTime = 0;
    this.selectItem.play();
  }

  selectTab(tab: string) {
    this.switchButton.currentTime = 0;
    this.switchButton.play();
    this.selectedTab = tab;
  }
}
