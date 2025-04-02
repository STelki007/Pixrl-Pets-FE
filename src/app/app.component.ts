import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SideBarButtonsService } from './services/SideBarButtonsService';
import { MainPageComponent } from './components/main-page-component/main-page-component';
import { AnimalComponent } from './components/animal-component/animal-component';
import { InventarComponent } from './components/inventar-component/inventar-component';
import { SellComponentComponent } from './components/sell-component/sell-component.component';
import { ShopComponent } from './components/shop-component/shop-component';
import { CoinComponent } from './components/coin-component/coin-component';
import { SettingComponentComponent } from './components/setting-component/setting-component.component';
import {InputTextModule} from 'primeng/inputtext';
import {AnimalsViewComponent} from './components/animals-view-component/animals-view.component';
import {ArrowService} from './services/animal/ArrowService';
import Keycloak from "keycloak-js";
import {GameComponent} from '@components/game/game.component';
@Component({
  selector: 'app-root',
  imports: [
    MainPageComponent,
    AnimalComponent,
    NgIf,
    InventarComponent,
    SellComponentComponent,
    ShopComponent,
    CoinComponent,
    SettingComponentComponent,
    InputTextModule,
    AnimalsViewComponent,
    GameComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private keycloak = inject(Keycloak);
  selectedComponent: string = "";
  private subscription!: Subscription;
  private audio!: HTMLAudioElement;
  protected arrowServiceValue: boolean = false;

  constructor(private sideBarButtonsService: SideBarButtonsService,
              private arrowService: ArrowService) {}

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

  logoutUser() {
    if(this.keycloak.authenticated) {
      this.keycloak.logout();
    } else {
      this.keycloak.login();
    }
  }

  onAnimalsBtnClick() {
    this.arrowService.getValue().subscribe(value => {
      this.arrowServiceValue = value;
    })
    if (this.arrowServiceValue) {
      this.sideBarButtonsService.setValue("animal")
    }else{
      this.sideBarButtonsService.setValue("animals")
    }
  }
}
