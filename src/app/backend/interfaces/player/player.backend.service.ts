import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

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

  getPlayerByKeycloakSessionId() {
    return this.http.get(`http://localhost:8081/player/keycloakUserId/52cc0208-a3bd-4367-94c5-0404b016a003`, {
      headers: this.authContextService.headerGetToken()
    })
  }

  createPlayer(body: any) {
    return this.http.post(`http://localhost:8081/player`, body, {
      headers: this.authContextService.headerGetToken()
    })
  }

}

