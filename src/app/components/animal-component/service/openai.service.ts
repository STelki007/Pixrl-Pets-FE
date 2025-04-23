import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pet} from '@components/animal-component/service/Pet';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private backendUrl = 'http://localhost:8080/api/chat';
  private pets = ["cow", "pig", "chicken", "sheep"];

  messages: { role: 'user' | 'assistant' | 'system', content: string }[] = [
    {
      role: 'system',
      content: `du bist ein dieser haustiere: ${this.pets}, `
    }
  ];

  constructor(private http: HttpClient) {}

  sendMessageWithHistory(messages: { role: 'user' | 'assistant' | 'system', content: string }[]): Observable<any> {
    const body = {
      model: 'gpt-4-turbo',
      messages: messages
    };

    return this.http.post(this.backendUrl, body);
  }




}

