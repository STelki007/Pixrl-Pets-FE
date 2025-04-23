import { Component, OnInit } from '@angular/core';
import {CoinComponent} from '../coin-component/coin-component';
import {ArrowService} from '@services/animal/ArrowService';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {OpenAIService} from '@components/animal-component/service/openai.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChatCompletionResponse} from '@components/animal-component/service/ChatCompletionResponse';
import {FactoryTarget} from '@angular/compiler';
import {PetFactory} from '@components/animal-component/service/PetFactory';
import {ChatMessage} from '@components/animal-component/service/ChatMessage';

@Component({
  selector: 'app-animal-component',
  templateUrl: './animal-component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrl: './animal-component.css'
})
export class AnimalComponent implements OnInit {
  private arrowServiceValue: boolean = false;
  userInput = "";
  messagesList: { response: string; request: string }[] = [];

  constructor(private  arrowService: ArrowService,
              private sideBarButtonsService: SideBarButtonsService,
              private openai: OpenAIService
              ) {}

  ngOnInit(): void {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      this.openai.messages = JSON.parse(savedMessages);
    }
  }

  sendMassageToAI() {

    console.log(PetFactory.convertObjectToPetString(PetFactory.createPet("cow")))
    if (!this.userInput.trim()) return;

    this.openai.messages.push({ role: 'user', content: this.userInput });

    const currentMessage = {
      request: this.userInput,
      response: '...'
    };

    this.messagesList.push(currentMessage);
    const currentIndex = this.messagesList.length - 1;

    const lastMessages = this.openai.messages.slice(-10);
    const currentPet = PetFactory.createPet("cow");
    const systemPrompt: ChatMessage = {
      role: 'system',
      content: `
      Im Backend ist die Tokenbegrenzung auf 100 eingestellt – passe deine Antwort so an, dass sie nicht abgeschnitten wirkt, auch wenn sie gekürzt werden muss. also maximal 30 wörter antworten
    Sie sind ein digitales Haustier-Simulationsmodell.
    Ihre Aufgabe ist es, als folgendes Tier zu antworten:

    ${PetFactory.convertObjectToPetString(currentPet)}

    Verhalten und reagieren Sie sich entsprechend diesem Tiercharakter.
  `
    };

    const messagesToSend: ChatMessage[] = [systemPrompt, ...lastMessages];

    this.openai.sendMessageWithHistory(messagesToSend).subscribe((res: ChatCompletionResponse) => {
      const aiResponse = res.choices[0].message.content;
      const usage = res.usage;

      this.openai.messages.push({ role: 'assistant', content: aiResponse });

      localStorage.setItem('chatHistory', JSON.stringify(this.openai.messages));

      this.messagesList[currentIndex].response = aiResponse;


      console.log('Prompt Tokens:', usage.prompt_tokens);
      console.log('Completion Tokens:', usage.completion_tokens);
      console.log('Total Tokens:', usage.total_tokens);
    });

    this.userInput = '';
  }


  onArrowClick() {
    this.arrowService.setValue(false);
    this.arrowService.getValue().subscribe(value => {
      this.arrowServiceValue = value;
    })
    if (this.arrowServiceValue) {
      this.sideBarButtonsService.setValue("animal");
    }else{
      this.sideBarButtonsService.setValue("animals")
    }
  }

}
