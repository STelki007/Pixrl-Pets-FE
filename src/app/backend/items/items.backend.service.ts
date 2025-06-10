import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from "@/app/backend/services/auth.context.service";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class ItemsBackendService{
  constructor(private http: HttpClient, private authContextService: AuthContextService ) { }

  getAllItems () {
    return this.http.get('http://localhost:8081/item', {
      headers: this.authContextService.headerGetToken()
    })
  }

  getItemById(id: number) {
    return this.http.get(`http://localhost:8081/item/id/${id}`, {
      headers: this.authContextService.headerGetToken()
    });
  }
}
