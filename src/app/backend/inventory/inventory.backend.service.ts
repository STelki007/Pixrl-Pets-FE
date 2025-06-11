import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {BackendUrlService} from '@/app/backend/services/backend.url.service';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class InventoryBackendService {
  constructor(private http: HttpClient, private authContextService: AuthContextService) {}

  getInventoryByPlayerSessionId() {
    return this.http.get(`${BackendUrlService.getBackendUrl()}/inventory/owned`, {
      headers: this.authContextService.headerGetToken()
    })
  }
}
