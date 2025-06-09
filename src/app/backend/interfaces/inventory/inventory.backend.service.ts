import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class InventoryBackendService {
  constructor(private http: HttpClient, private authContextService: AuthContextService) {}

  getInventoryByPlayerSessionId(playerSessionId: any) {
    return this.http.get('http://localhost:8081/inventory/' + playerSessionId, {
      headers: this.authContextService.headerGetToken()
    })
  }
}
