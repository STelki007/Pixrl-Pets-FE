import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainPageComponentComponent} from './components/main-page-component/main-page-component.component';
import {AdoptComponentComponent} from './components/adopt-component/adopt-component.component';
import {NgIf} from '@angular/common';
import {SideBarButtonsService} from './services/SideBarButtonsService';
import {Subscription} from 'rxjs';
import {InventarComponentComponent} from './components/inventar-component/inventar-component.component';
import {SellComponentComponent} from './components/sell-component/sell-component.component';
import {BuyComponentComponent} from './components/buy-component/buy-component.component';
import {CoinComponent} from './components/coin-component/coin-component';
import {SettingComponentComponent} from './components/setting-component/setting-component.component';

@Component({
  selector: 'app-root',
  imports: [MainPageComponentComponent, AdoptComponentComponent, NgIf, InventarComponentComponent, SellComponentComponent, BuyComponentComponent, CoinComponent, SettingComponentComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  selectedComponent: string = "";
  private subscription!: Subscription;

  constructor(private sideBarButtonsService: SideBarButtonsService) {}

  ngOnInit() {
    this.subscription = this.sideBarButtonsService.sideBarObservable()
      .subscribe(value => {
        this.selectedComponent = value;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectComponent(value: string) {
    this.sideBarButtonsService.setValue(value);
  }

}
