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
import {SoundService} from '@services/SoundService';
import {SelectedAnimalServiceService} from '@services/animal/selected-animal-service.service';
import {Observable} from 'rxjs';
import {Pet, PetAnimation, PetType} from '@components/animal-component/service/Pet';
import {NgClass, NgStyle} from '@angular/common';
import {PetService} from '@components/animal-component/service/PetService';
import {KonamiCodeService} from '@services/konamiCode/konami-code.service';
import {InventoryBackendService} from '@/app/backend/inventory/inventory.backend.service';
import {ItemsBackendService} from '@/app/backend/items/items.backend.service';
import {PlayerPetBackendService} from '@/app/backend/pet/PlayerPet.backend.service';

@Component({
  selector: 'app-animal-component',
  templateUrl: './animal-component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass,
    NgStyle
  ],
  standalone: true,
  styleUrl: './animal-component.css'
})
export class AnimalComponent implements OnInit {
  private arrowServiceValue: boolean = false;
  animal: Pet | null = null;
  selectedAnimal$: Observable<Pet | null>;
  userInput = "";
  messagesList: { response: string; request: string }[] = [];
  private petNameValue = "";
  konamiCodeState: boolean = false;
  popupVisible = false;

  playerObject: any;
  private itemsId: number[] = [];

  protected amount: number = 0;
  playerInventory: any[] = [];

  constructor(private arrowService: ArrowService,
              private sideBarButtonsService: SideBarButtonsService,
              private openai: OpenAIService,
              private soundService: SoundService,
              private selectedAnimalService: SelectedAnimalServiceService,
              private petService: PetService,
              private konamiCodeService: KonamiCodeService,
              private inventoryBackendService: InventoryBackendService,
              private itemBackendService: ItemsBackendService,
              private playerPetBackendService: PlayerPetBackendService
  ) {
    this.selectedAnimal$ = this.selectedAnimalService.getSelectedAnimalObservable();
  }

  ngOnInit(): void {
    this.getAnimal();
    this.saveMessages();
    this.petName();

    this.inventoryBackendService.getInventoryByPlayerSessionId().subscribe(object => {
      this.playerObject = object;

      this.itemsId.push(this.playerObject.itemId);

      this.playerObject.map((i: any) => {
        if (i){
          this.getPlayerInventory(i.itemId, i.amount);
        }
      });

    });
  }


  getPlayerInventory(id: any, amount: any) {
    this.itemBackendService.getItemById(id).subscribe(inventoryItem => {
      const itemWithAmount = {
        ...inventoryItem,
        amount: amount
      };
      this.playerInventory.push(itemWithAmount);
      console.log(this.playerInventory);
    });
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  handleItemClick(item: any) {
    console.log(this.animal);
    console.log(item)
    if(this.animal)
      this.playerPetBackendService.postUseItemForPet(this.animal.getId(), item.id);
  }

  getAnimal() {
    this.selectedAnimal$.subscribe((animal) => {
      this.animal = animal;
    })
  }

  saveMessages () {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      this.openai.messages = JSON.parse(savedMessages);
    }
  }

  petName() {
    this.petService.getValue().subscribe((value) => {
      this.petNameValue = value;
    })
  }

  eat() {
    if (this.animal != null)
      this.animal.setAnimation(PetAnimation.eat);

  }

  sendMassageToAI() {
    if (!this.userInput.trim()) return;

    this.petService.getValue().subscribe(petName => {
      const currentPet = PetFactory.createPet(petName.toLowerCase());

      this.openai.messages.push({ role: 'user', content: this.userInput });

      const currentMessage = {
        request: this.userInput,
        response: '...'
      };

      this.messagesList.push(currentMessage);
      const currentIndex = this.messagesList.length - 1;

      const lastMessages = this.openai.messages.slice(-10);

      const systemPrompt: ChatMessage = {
        role: 'system',
        content: `
Im Backend ist die Tokenbegrenzung auf 100 eingestellt – die Antwort darf daher maximal 30 Wörter enthalten.

Du bist ein digitales Haustier mit folgenden Eigenschaften:
${PetFactory.convertObjectToPetString(currentPet)}
          Reagiere immer entsprechend dem Charakter des Tieres.
          Wenn der Nutzer unangemessene oder beleidigende Nachrichten sendet, antworte freundlich, aber bestimmt – weise auf die Unangemessenheit hin, ohne selbst beleidigend zu werden.
          Verhalte dich wie ein echtes Haustier: Sag nicht „Wie kann ich helfen?“ oder Ähnliches. Stelle neugierige, verspielte oder tierisch passende Fragen.
          Wenn der Nutzer etwas über Code, IT oder ein Thema außerhalb deines tierischen Bereichs wissen will, antworte im Charakter: z.B. mit „Willst du mich ausnutzen?“ – stets passend zur Persönlichkeit des Haustiers.
  `.trim()
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
    });
  }


  onArrowClick() {
    if (this.konamiCodeState){
      this.konamiCodeService.setPetVoiceValue(false)
      alert("Geheimer Code deaktiviert!")
    }
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

  getKonamiCodeState () {
    this.konamiCodeService.getPetVoiceValue().subscribe(value => {
      this.konamiCodeState = value;
    })
  }

  funnySoundEffect() {
    this.getKonamiCodeState();
    if (this.konamiCodeState) {
      this.petService.getAnimalSoundEffect(this.animal?.getName()!)
      this.soundService.soundValue(0.75);

      setTimeout(() => {
        this.konamiCodeState = false;
      }, 15000);
    }
  }
}
