import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SideBarButtonsService } from './services/SideBarButtonsService';
import { MainPageComponent } from './components/main-page-component/main-page-component';
import { AdoptComponent } from './components/adopt-component/adopt-component';
import { InventarComponent } from './components/inventar-component/inventar-component';
import { SellComponentComponent } from './components/sell-component/sell-component.component';
import { ShopComponent } from './components/shop-component/shop-component';
import { CoinComponent } from './components/coin-component/coin-component';
import { SettingComponentComponent } from './components/setting-component/setting-component.component';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [
    MainPageComponent,
    AdoptComponent,
    NgIf,
    InventarComponent,
    SellComponentComponent,
    ShopComponent,
    CoinComponent,
    SettingComponentComponent,
    InputTextModule
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  selectedComponent: string = "";
  private subscription!: Subscription;
  private audio!: HTMLAudioElement;

  constructor(private sideBarButtonsService: SideBarButtonsService) {}

  ngOnInit() {
    this.audio = new Audio('select-sound.mp3');
    this.audio.load();

    this.subscription = this.sideBarButtonsService.sideBarObservable()
      .subscribe(value => {
        this.selectedComponent = value;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectComponent(value: string) {
    this.audio.currentTime = 0;
    this.audio.play().then(() => {
      this.sideBarButtonsService.setValue(value);
    })
  }
}
