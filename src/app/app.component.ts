import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SideBarButtonsService } from '@services/SideBarButtonsService';
import { MainPageComponent } from '@components/main-page-component/main-page-component';
import { AnimalComponent } from '@components/animal-component/animal-component';
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
import {PlayerBackendService} from '@/app/backend/player/player.backend.service';
import {InventarComponent} from '@components/inventar-component/inventar-component';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {PlayerInterface} from '@/app/backend/player/playerInterface';
import {PetShopComponent} from '@components/pet-shop-component/pet-shop-component';
import {PlayerCoin} from '@/app/backend/player/PlayerCoins';
import {KonamiCodeService} from '@services/konamiCode/konami-code.service';

@Component({
  selector: 'app-root',
  imports: [
    MainPageComponent,
    AnimalComponent,
    NgIf,
    SellComponentComponent,
    ShopComponent,
    CoinComponent,
    SettingComponentComponent,
    InputTextModule,
    AnimalsViewComponent,
    GameComponent,
    UnoPlayerChatComponent,
    InventarComponent,
    PetShopComponent
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
  private userId: any | null = null;
  private players: any;
  private player: any;

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private unoGameStart: UnoGameStart,
    private soundService: SoundService,
    private playerBackendService: PlayerBackendService,
    private authContextService: AuthContextService,
    private konamiCodeService: KonamiCodeService,

  ) {}

  ngOnInit() {
    this.startAudio();
    this.getSidebarValue();
    this.getGameServiceValue();
    this.createNewPlayer()
    this.konamiCodeService.konamiCodeInfinityCoins();
  }

  createNewPlayer () {
    console.log(this.keycloak.token);
    this.keycloak.loadUserInfo().then((userInfo: any) => {
      const keycloakUserId = userInfo.sub;
      const username = userInfo.preferred_username;

      this.playerBackendService.getAllPlayers().subscribe(players => {
        this.players = players;
        const exists = this.players.some((player: any) => player.keycloakUserId === keycloakUserId);

        if (!exists) {
          const newPlayer: PlayerInterface = {
            keycloakUserId: keycloakUserId,
            username: username,
            coins: 2000
          };

          this.playerBackendService.createPlayer(newPlayer).subscribe(() => {
          this.getUserId(keycloakUserId);
          });
        } else {
          console.log("Spieler existiert bereits.");
        }

      });
    });
  }

  getUserId (keycloakUserId: any) {
    const current = this.players.find((p: any) => p.keycloakUserId === keycloakUserId);
    if (current) {
      this.authContextService.setUserId(current.id);
    }
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
    console.log(value);
    if (!this.isUnoStarted) {
      this.soundService.playSound("select-sound.mp3");
      this.sideBarButtonsService.setValue(value);

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
