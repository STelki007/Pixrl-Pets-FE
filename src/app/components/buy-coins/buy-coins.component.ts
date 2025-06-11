import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-buy-coins',
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './buy-coins.component.html',
  styleUrl: './buy-coins.component.css'
})
export class BuyCoinsComponent {
  coinPacks = [
    {
      amount: 500,
      price: 2.99,
      image: 'assets/coinsImage/coin1.png',
      label: ''
    },
    {
      amount: 3500,
      price: 4.99,
      image: 'assets/coinsImage/coin2.png',
      label: 'Popular'
    },
    {
      amount: 20000,
      price: 9.99,
      image: 'assets/coinsImage/coin4.png',
      label: ''
    },
    {
      amount: 50000,
      price: 19.99,
      image: 'assets/coinsImage/coin3.png',
      label: 'Best deal!'
    }
  ];

}
