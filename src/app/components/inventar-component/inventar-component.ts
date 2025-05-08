import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {audit} from 'rxjs';
import {SoundService} from '@services/SoundService';

@Component({
  selector: 'app-inventar-component',
  imports: [
    NgForOf
  ],
  templateUrl: './inventar-component.html',
  styleUrl: './inventar-component.css'
})
export class InventarComponent implements OnInit {

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
