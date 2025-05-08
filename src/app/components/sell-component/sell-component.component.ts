import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SoundService} from '@services/SoundService';

@Component({
  selector: 'app-sell-component',
  imports: [
    NgForOf
  ],
  templateUrl: './sell-component.component.html',
  styleUrl: './sell-component.component.css'
})
export class SellComponentComponent implements OnInit {

  constructor(
    private soundService: SoundService,
  ) {
  }

  items = [
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀']
  ];

  ngOnInit(): void {

  }

  onClickItem() {
    this.soundService.playSound("select-item.mp3")
  }
}
