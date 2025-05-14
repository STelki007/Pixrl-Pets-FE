import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap} from 'rxjs';
import { PetFactory } from '@components/animal-component/service/PetFactory';
import { ChatMessage } from '@components/animal-component/service/ChatMessage';
import { GetPetNameService } from '@components/animal-component/service/get-pet-name.service';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private backendUrl = 'http://localhost:8080/api/chat';

  messages: ChatMessage[] = [];

  constructor(
    private http: HttpClient,
    private getPetName: GetPetNameService
  ) {}

  sendMessageWithHistory(messages: ChatMessage[]): Observable<any> {
    return this.getPetName.getValue().pipe(
      switchMap((petName) => {
        const petString = PetFactory.convertObjectToPetString(
          PetFactory.createPet(petName.toLowerCase())
        );

        const systemMessage: ChatMessage = {
          role: 'system',
          content: `
Im Backend ist die Tokenbegrenzung auf 100 eingestellt – maximal 30 Wörter antworten.
Sie sind ein digitales Haustier-Simulationsmodell mit folgenden Eigenschaften:
${petString}
Reagiere und verhalte dich, als ob du dieses Tier bist. ;)
          `.trim()
        };

        const fullMessageHistory: ChatMessage[] = [systemMessage, ...messages];

        const body = {
          model: 'gpt-4-turbo',
          messages: fullMessageHistory
        };

        return this.http.post(this.backendUrl, body);
      })
    );
  }
}
