import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AlertCenterModalComponent} from '@components/modal/alert-center-modal-component/alert-center-modal-component';
import {InfoCantBuyCoinsService} from '@components/buy-coins/services/info.cant.buy.coins.service';

@Component({
  selector: 'app-buy-coins',
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    AlertCenterModalComponent
  ],
  templateUrl: './buy-coins.component.html',
  styleUrl: './buy-coins.component.css',
  standalone: true
})
export class BuyCoinsComponent {

  protected title: string = "Diese Funktion ist derzeit nicht verfügbar.";

  constructor(
    protected infoCantBuyCoinsService: InfoCantBuyCoinsService,
  ) {
  }

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

  onBuyCoinsClick() {
    this.infoCantBuyCoinsService.setValue(true)

  }

  closeModal() {
    this.infoCantBuyCoinsService.setValue(false)
  }
}
