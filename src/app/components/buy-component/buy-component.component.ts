import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-buy-component',
  imports: [
    NgForOf
  ],
  templateUrl: './buy-component.component.html',
  styleUrl: './buy-component.component.css'
})
export class BuyComponentComponent {
  items = [
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀']
  ];
}
