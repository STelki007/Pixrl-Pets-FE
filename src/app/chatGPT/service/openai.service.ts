import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private backendUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const body = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    };

    return this.http.post(this.backendUrl, body);
  }
}

