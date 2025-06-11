import {Injectable} from '@angular/core';
import {PlayerBackendService} from '@/app/backend/player/player.backend.service';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class PlayerCoinService {
  private playerCoinsSubject = new BehaviorSubject<number>(0);
  playerCoins$ = this.playerCoinsSubject.asObservable();

  constructor(private playerBackendService: PlayerBackendService,
              private authContextService: AuthContextService,
  ) {}

  loadPlayerCoins() {
    this.playerBackendService.getPlayerByKeycloakSessionId(this.authContextService.getSessionId())
      .pipe(
        map(player => player.coins),
        catchError(error => {
          console.error('Fehler beim Laden der Coins', error);
          return of(0);
        })
      )
      .subscribe(coins => this.playerCoinsSubject.next(coins));
  }



}
