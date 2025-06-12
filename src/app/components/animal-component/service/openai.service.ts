import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap} from 'rxjs';
import { PetFactory } from '@components/animal-component/service/PetFactory';
import { ChatMessage } from '@components/animal-component/service/ChatMessage';
import { PetService } from '@components/animal-component/service/PetService';
import {BackendUrlService} from '@/app/backend/services/backend.url.service';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Injectable({ providedIn: 'root' })
export class OpenAIService {

  messages: ChatMessage[] = [];

  constructor(
    private http: HttpClient,
    private getPetName: PetService,
    private authContexService: AuthContextService
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
                      ${petString} Reagiere und verhalte dich, als ob du dieses Tier bist. ;)
          `.trim()
        };

        const fullMessageHistory: ChatMessage[] = [systemMessage, ...messages];

        const body = {
          model: 'gpt-4-turbo',
          messages: fullMessageHistory
        };

        return this.http.post(`${BackendUrlService.getBackendUrl()}/api/chat`, body,{headers: this.authContexService.headerGetToken()});
      })
    );
  }
}
