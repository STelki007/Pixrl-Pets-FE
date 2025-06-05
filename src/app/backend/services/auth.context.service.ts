import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {HttpHeaders} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthContextService {
  private keycloak = inject(Keycloak);
  private userId: number | null = null;

  private get token(): string | undefined {
    return this.keycloak.token;
  }

   getToken(): string | undefined {
    return this.keycloak.token;
  }

   headerGetToken(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getSessionId(){
    return this.keycloak.sessionId;
  }

  getKeycloakUserName() {
    return this.keycloak.userInfo
  }

  setUserId(userId: number) {
    this.userId = userId;
    console.log("Gesetzt:", userId);
  }

  getUserId(): number | null {
    return this.userId;
  }


}
