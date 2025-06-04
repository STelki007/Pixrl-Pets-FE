import {BackendUrlService} from '@services/backend.url.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  keycloak = inject(Keycloak);

  constructor(private http: HttpClient) {}

  private get bearer(): string | undefined {
    return this.keycloak.token;
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.bearer}`);
  }

  getKeyCloakPlayerId() {
    return this.http.get(
      `${BackendUrlService.getBackendUrl()}/player/UwU`,
      { headers: this.headers }
    );
  }
}

