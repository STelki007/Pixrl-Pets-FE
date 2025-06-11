import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import { map, bufferCount, filter } from 'rxjs/operators';
import {PlayerBackendService} from '@/app/backend/player/player.backend.service';
import {PlayerCoinService} from '@/app/backend/player/player.coin.service';

@Injectable({
  providedIn: 'root'
})
export class KonamiCodeService {
  private konamiCodeState = new BehaviorSubject<boolean>(false);
  private keySequencePetVoice: string[] = [];
  private keySequenceInfinityCoins: string[] = [];
  private petVoiceSecretKey: string = "schwerk"
  private infinityCoinsSecretKey: string = "barbour"
  private resetTimeSec: number = 15000;

  constructor(private playerBackendService: PlayerBackendService, private playerCoinService: PlayerCoinService) {
    this.konamiCodePet();
  }

  setPetVoiceValue(value: boolean) {
    this.konamiCodeState.next(value);
  }

  getPetVoiceValue() {
    return this.konamiCodeState.asObservable();
  }


  konamiCodePet(): void {
    fromEvent<KeyboardEvent>(window, 'keyup').subscribe(event => {
      this.keySequencePetVoice.push(event.key);

      if (this.keySequencePetVoice.length > this.petVoiceSecretKey.length) {
        this.keySequencePetVoice.shift();
      }

      if (this.keySequencePetVoice.join('').toLowerCase() === this.petVoiceSecretKey.toLowerCase()) {
        this.setPetVoiceValue(true);
        alert(`Geheimer Code aktiviert: Nutzungsdauer ist: 15 Sekunden`);
        setTimeout(() => this.setPetVoiceValue(false), this.resetTimeSec);
        this.keySequencePetVoice = [];
      }
    });
  }

  konamiCodeInfinityCoins(): void {
    fromEvent<KeyboardEvent>(window, 'keyup').subscribe(event => {
      this.keySequenceInfinityCoins.push(event.key);

      if (this.keySequenceInfinityCoins.length > this.infinityCoinsSecretKey.length) {
        this.keySequenceInfinityCoins.shift();
      }

      if (this.keySequenceInfinityCoins.join('').toLowerCase() === this.infinityCoinsSecretKey.toLowerCase()) {
        alert(`Geheimer Code aktiviert! Du bekommst 25.000 Coins`);
        this.playerBackendService.addCoinsGlitch(25000);
        this.playerCoinService.loadPlayerCoins();
        this.keySequenceInfinityCoins = [];
      }
    });
  }
}
