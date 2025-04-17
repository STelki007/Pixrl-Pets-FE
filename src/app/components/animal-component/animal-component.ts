import { Component } from '@angular/core';
import {CoinComponent} from '../coin-component/coin-component';
import {ArrowService} from '@services/animal/ArrowService';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {OpenAIService} from '@components/animal-component/service/openai.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChatCompletionResponse} from '@components/animal-component/ChatCompletionResponse';

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
export class AnimalComponent {
  private arrowServiceValue: boolean = false;
  userInput = "";
  aiResponseList: string[] = [];
  userTextMassages: string[] = [];

  constructor(private  arrowService: ArrowService,
              private sideBarButtonsService: SideBarButtonsService,
              private openai: OpenAIService
              ) {}

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

  sendMassageToAI() {
    this.userTextMassages.push(this.userInput);
    if (!this.userInput.trim()) return;

    this.openai.sendMessage(this.userInput).subscribe((res: ChatCompletionResponse) => {
      const content = res.choices[0].message.content;
      const usage = res.usage;

      this.aiResponseList.push(content);

      console.log('Prompt Tokens:', usage.prompt_tokens);
      console.log('Completion Tokens:', usage.completion_tokens);
      console.log('Total Tokens:', usage.total_tokens);
      console.log(usage)
    });

    this.userInput = '';
  }

}
