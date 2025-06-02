import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SideBarButtonsService } from '@services/SideBarButtonsService';
import { MainPageComponent } from '@components/main-page-component/main-page-component';
import { AnimalComponent } from '@components/animal-component/animal-component';
import { InventarComponent } from '@components/inventar-component/inventar-component';
import { SellComponentComponent } from '@components/sell-component/sell-component.component';
import { ShopComponent } from '@components/shop-component/shop-component';
import { CoinComponent } from '@components/coin-component/coin-component';
import { SettingComponentComponent } from '@components/setting-component/setting-component.component';
import {InputTextModule} from 'primeng/inputtext';
import {AnimalsViewComponent} from '@components/animals-view-component/animals-view.component';
import {ArrowService} from '@services/animal/ArrowService';
import {GameComponent} from '@components/game-component/game.component';
import {UnoGameStart} from '@components/games/uno/services/uno/UnoGameStart';
import {SoundService} from '@services/SoundService';
import {UnoPlayerChatComponent} from '@components/games/uno/uno-player-chat/uno-player-chat.component';
import Keycloak from 'keycloak-js';

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
    GameComponent,
    UnoPlayerChatComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private keycloak = inject(Keycloak);
  selectedComponent: string = "";
  private subscription!: Subscription;
  protected arrowServiceValue: boolean = false;
  private isUnoStarted = false;

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private unoGameStart: UnoGameStart,
    private soundService: SoundService,

  ) {}

  ngOnInit() {
    this.startAudio();
    this.getSidebarValue();
    this.getGameServiceValue();
  }

  startAudio(){
    this.soundService.playSound("select-sound.mp3");
  }

  getGameServiceValue(): void {
    this.unoGameStart.getValue().subscribe((value) => {
      this.isUnoStarted = value;
    })
  }

  getSidebarValue() {
    this.subscription = this.sideBarButtonsService.sideBarObservable()
      .subscribe(value => {
        this.selectedComponent = value;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectComponent(value: string) {
    if (!this.isUnoStarted){
      this.soundService.playSound("select-sound.mp3");
      this.sideBarButtonsService.setValue(value);
    }else {
      alert("Spiel läuft gerade! Bitte über 'Spiel beenden' klicken.")
    }
  }

  logoutUser() {
    if(this.keycloak.authenticated) {
      this.keycloak.logout();
    } else {
      this.keycloak.login();
    }
  }

  onAnimalsBtnClick() {
    if (!this.isUnoStarted) {
      this.arrowService.getValue().subscribe(value => {
        this.arrowServiceValue = value;
      })
      if (this.arrowServiceValue) {
        this.soundService.playSound("select-sound.mp3");
        this.sideBarButtonsService.setValue("animal")
      }else{
        this.soundService.playSound("select-sound.mp3");
        this.sideBarButtonsService.setValue("animals")
      }
    }else {
      alert("Spiel läuft gerade! Bitte über 'Spiel beenden' klicken.")
    }
  }
}
