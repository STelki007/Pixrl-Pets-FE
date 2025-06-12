import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {Observable} from 'rxjs';
import {PlayerInterface} from '@/app/backend/player/playerInterface';
import {BackendUrlService} from '@/app/backend/services/backend.url.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerBackendService {

  constructor(
    private http: HttpClient,
    private authContextService: AuthContextService,
  ) {}


    getAllPlayers() {
    return this.http.get(`${BackendUrlService.getBackendUrl()}/player`, {
      headers: this.authContextService.headerGetToken()
    })
  }

  getPlayerByKeycloakSessionId(sessionId: any): Observable<PlayerInterface> {
    return this.http.get<PlayerInterface>(`${BackendUrlService.getBackendUrl()}/player/keycloakUserId/` + sessionId, {
      headers: this.authContextService.headerGetToken()
    })
  }

  createPlayer(body: any) {
    return this.http.post(`${BackendUrlService.getBackendUrl()}/player`, body, {
      headers: this.authContextService.headerGetToken()
    })
  }

  addCoinsGlitch(coins: number) {
    return this.http.post(
      `${BackendUrlService.getBackendUrl()}/player/add-coins-glitch/${coins}`,
      {},
      {
        headers: this.authContextService.headerGetToken()
      }
    );

  }

  addCoins(coins: number) {
    return this.http.post(
      `${BackendUrlService.getBackendUrl()}/player/add-coins/${coins}`,
      {},
      {
        headers: this.authContextService.headerGetToken()
      }
    );

  }


}

