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
import Keycloak from "keycloak-js";
import {GameComponent} from '@components/game-component/game.component';
import {UnoComponent} from '@components/games/uno/uno.component';
import {UnoGameStart} from '@components/games/uno/services/uno/uno-game-start.service';
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
    GameComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  // private keycloak = inject(Keycloak);
  selectedComponent: string = "";
  private subscription!: Subscription;
  private audio!: HTMLAudioElement;
  protected arrowServiceValue: boolean = false;
  private isUnoStarted = false;

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private unoGameStart: UnoGameStart) {}

  ngOnInit() {
    this.startAudio();
    this.getSidebarValue();
    this.getGameServiceValue();
  }

  startAudio(){
    this.audio = new Audio('select-sound.mp3');
    this.audio.load();
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
      this.audio.currentTime = 0;
      this.audio.play().then(() => {
        this.sideBarButtonsService.setValue(value);
      })
    }else {
      alert("Spiel läuft gerade! Bitte über 'Spiel beenden' klicken.")
    }
  }

  // logoutUser() {
  //   if(this.keycloak.authenticated) {
  //     this.keycloak.logout();
  //   } else {
  //     this.keycloak.login();
  //   }
  // }

  onAnimalsBtnClick() {
    if (!this.isUnoStarted) {
      this.arrowService.getValue().subscribe(value => {
        this.arrowServiceValue = value;
      })
      if (this.arrowServiceValue) {
        this.sideBarButtonsService.setValue("animal")
      }else{
        this.sideBarButtonsService.setValue("animals")
      }
    }else {
      alert("Spiel läuft gerade! Bitte über 'Spiel beenden' klicken.")
    }
  }
}
