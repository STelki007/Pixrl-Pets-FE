import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-buy-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf],
  templateUrl: './buy-component.component.html',
  styleUrl: './buy-component.component.css'
})
export class BuyComponentComponent implements OnInit {
  private selectItem!: HTMLAudioElement;
  private switchButton!: HTMLAudioElement;
  selectedTab: string = "buy";
  isOffcanvasOpen: boolean = false;
  items = new Array(12)

  constructor() {}

  ngOnInit(): void {
    this.selectItem = new Audio("select-item.mp3"); this.selectItem.load(); this.selectItem.volume = 1;
    this.switchButton = new Audio("cabinet-door.mp3"); this.switchButton.load(); this.switchButton.volume = 1;
  }

  onClickItem() {
    this.selectItem.currentTime = 0;
    this.selectItem.play();
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

  selectTab(tab: string) {
    this.switchButton.currentTime = 0;
    this.switchButton.play();
    this.selectedTab = tab;
  }

  onClickInfo(index: number) {
    this.isOffcanvasOpen = true;
    console.log(index)
  }
}
