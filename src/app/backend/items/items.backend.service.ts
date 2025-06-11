import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from "@/app/backend/services/auth.context.service";
import {BackendUrlService} from '@/app/backend/services/backend.url.service';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class ItemsBackendService{
  constructor(private http: HttpClient, private authContextService: AuthContextService ) { }

  getAllItems () {
    return this.http.get(`${BackendUrlService.getBackendUrl()}/item`, {
      headers: this.authContextService.headerGetToken()
    })
  }

  getItemById(id: number) {
    return this.http.get(`${BackendUrlService.getBackendUrl()}/item/id/${id}`, {
      headers: this.authContextService.headerGetToken()
    });
  }
}
