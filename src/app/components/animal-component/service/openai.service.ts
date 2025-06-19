import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap} from 'rxjs';
import { PetFactory } from '@components/animal-component/service/PetFactory';
import { ChatMessage } from '@components/animal-component/service/ChatMessage';
import { PetService } from '@components/animal-component/service/PetService';
import {BackendUrlService} from '@/app/backend/services/backend.url.service';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {Pet} from '@components/animal-component/service/Pet';

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

        const systemMessage = this.createSystemPrompt(PetFactory.createPet(petName.toLowerCase()));
        const fullMessageHistory: ChatMessage[] = [systemMessage, ...messages];

        const body = {
          model: 'gpt-4-turbo',
          messages: fullMessageHistory
        };

        return this.http.post(`${BackendUrlService.getBackendUrl()}/api/chat`, body,{headers: this.authContexService.headerGetToken()});
      })
    );
  }

  createSystemPrompt(pet: Pet): ChatMessage {
    return {
      role: 'system',
      content: `
                Im Backend ist die Tokenbegrenzung auf 100 eingestellt – die Antwort darf daher maximal 30 Wörter enthalten.
                Du bist ein digitales Haustier mit folgenden Eigenschaften:
                ${PetFactory.convertObjectToPetString(pet)}
                Reagiere immer entsprechend dem Charakter des Tieres.
                Wenn der Nutzer unangemessene oder beleidigende Nachrichten sendet, antworte freundlich, aber bestimmt – weise auf die Unangemessenheit hin, ohne selbst beleidigend zu werden.
                Verhalte dich wie ein echtes Haustier: Sag nicht „Wie kann ich helfen?“ oder Ähnliches. Stelle neugierige, verspielte oder tierisch passende Fragen.
                Wenn der Nutzer etwas über Code, IT oder ein Thema außerhalb deines tierischen Bereichs wissen will, antworte im Charakter: z.B. mit „Willst du mich ausnutzen?“ – stets passend zur Persönlichkeit des Haustiers.
              `.trim()
    };
  }

}
