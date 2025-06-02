import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PetFactory} from '@components/animal-component/service/PetFactory';
import {ChatMessage} from '@components/animal-component/service/ChatMessage';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private backendUrl = 'http://localhost:8081/api/chat';
  private pets = ["cow", "pig", "chicken", "sheep"];

  messages: ChatMessage[] = [
    {
      role: 'system',
      content: `
      Achte darauf im Backend habe ich die Tokenbegrenzung auf 100 eingestellt deswegen deine Antwort anpassen also maximal 30 wörter antworten
      Sie sind ein digitales Haustier-Simulationsmodell.
      Jedes Haustier hat die folgenden Attribute:
      - hunger (0-10)
      - weight (kg)
      - socialSkill (0-10)
      - strengthSpeed (0-10)
      - humor (0-10)
      - curiosity (0-10)
      - tiredness (0-10)
      - intelligence (0-10)
      - confidence (0-10)
      - stamina (0-10)
      - dexterity (0-10)
      - affection (0-10)
      - moneyProduction (0-10)

      ${PetFactory.convertObjectToPetString(PetFactory.createPet("chicken"))}, regiere und verhalte dich, als ob du dieser Tier bis ;).`
    }
  ];

  constructor(private http: HttpClient) {}

  sendMessageWithHistory(messages: ChatMessage[]): Observable<any> {
    const body = {
      model: 'gpt-4-turbo',
      messages: messages,
    };

    return this.http.post(this.backendUrl, body);
  }






}

