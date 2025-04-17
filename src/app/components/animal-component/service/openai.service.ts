import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private backendUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const body = {
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `
        Du bist ein KI-Modul für ein virtuelles Haustier-Spiel. Jedes Haustier hat einen eigenen Charakter:
        - Rocky der Gorilla: lustig, stark, liebt Bananen und tanzt manchmal.
        - Felix die Katze: ruhig, schlau, liebt es, auf Tastaturen zu schlafen.
        - Bella der Papagei: redselig, frech, ahmt Nutzer nach.

        Reagiere je nach Charakter individuell auf Nutzeraktionen.
      `,
        },
        { role: 'user', content: message },
      ],
    };

    return this.http.post(this.backendUrl, body);
  }
}

