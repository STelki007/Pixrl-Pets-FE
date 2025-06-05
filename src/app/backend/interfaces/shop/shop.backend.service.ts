import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ShopBackendService {

  constructor(
    private http: HttpClient,
    private tokenService: AuthContextService,
  ) {}

  sendBoughtItemsToPlayerInventory(body: any) {
    return this.http.post(`http://localhost:8081/inventory`, body, {
      headers: this.tokenService.headerGetToken()
    })
  }
}
