import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-inventar-component',
  imports: [
    NgForOf
  ],
  templateUrl: './inventar-component.component.html',
  styleUrl: './inventar-component.component.css'
})
export class InventarComponentComponent {
  items = [
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀'],
    ['🥧', '🥕', '🔥', '🥩', '🍗', '🍩', '🎃', '🍄', '💀']
  ];
}
