import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {Observable} from 'rxjs';
import {PlayerInterface} from '@/app/backend/player/playerInterface';

@Injectable({
  providedIn: 'root'
})
export class PlayerBackendService {

  constructor(
    private http: HttpClient,
    private authContextService: AuthContextService,
  ) {}


    getAllPlayers() {
    return this.http.get('http://localhost:8081/player', {
      headers: this.authContextService.headerGetToken()
    })
  }

  getPlayerByKeycloakSessionId(sessionId: any): Observable<PlayerInterface> {
    return this.http.get<PlayerInterface>(`http://localhost:8081/player/keycloakUserId/` + sessionId, {
      headers: this.authContextService.headerGetToken()
    })
  }

  createPlayer(body: any) {
    return this.http.post(`http://localhost:8081/player`, body, {
      headers: this.authContextService.headerGetToken()
    })
  }

}

