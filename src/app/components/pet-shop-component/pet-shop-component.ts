import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SoundService} from '@services/SoundService';
import {FruitsService} from '@services/fruits.service';
import {ShopBackendService} from '@/app/backend/shop/shop.backend.service';
import {ShopInterface} from '@/app/backend/shop/shopInterface';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {PetTypeServiceService} from '@services/animal/pet-type-service.service';
import {Observable} from 'rxjs';
import {Pet} from '@components/animal-component/service/Pet';
import {PetTypeDto} from '@services/animal/PetTypeDto';
import {FruitInterface} from '@components/shop-component/FruitInterface';

@Component({
  selector: 'app-pet-shop-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, InputNumber, FormsModule, Toast, NgStyle],
  templateUrl: './pet-shop-component.html',
  styleUrl: './pet-shop-component.css',
  providers: [MessageService]
})
export class PetShopComponent implements OnInit {
  protected selectedTab: string = "buy";
  protected isOffcanvasOpen: boolean = false;
  @ViewChild('buyModal') buyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  selectedAnimal: any = null;
  protected quantity: number = 1;
  protected quantityError: string | null = null;
  protected fruit: FruitInterface | null = null;
  private petTypes$: Observable<PetTypeDto[]> = new Observable<PetTypeDto[]>;
  protected pets: PetTypeDto[] = [];

  constructor(private modalService: NgbModal,
              private messageService: MessageService,
              private soundService: SoundService,
              protected fruitsService: FruitsService,
              private shopBackendService: ShopBackendService,
              private authContextService: AuthContextService,
              private petTypeServiceService: PetTypeServiceService,
              private shopService: ShopBackendService) {
  }

  ngOnInit(): void {
    this.petTypes$ = this.petTypeServiceService.getPetTypes();
    this.petTypes$.subscribe((petTypes => {
      let pets: PetTypeDto[] = [];

      petTypes.forEach(petType => {
        petType = new PetTypeDto(petType.type, petType.petId, petType.price);
        let pet: Pet | null = petType.getPet();
        if (pet == null)
          return;
        pets.push(petType);
      })
      this.pets = pets;
      console.log("buyable pets:" + pets);
      console.log(pets);
      pets.forEach(pet => {
        console.log(pet);
      })
    }));
    this.petTypeServiceService.loadData();

  }

  @Output() componentSelected  = new EventEmitter<string>();

  emitSelectComponent(comp: string) {
    this.componentSelected .emit(comp);
  }


  private body: ShopInterface = {
    amount: 0,
    playerId: null,
    itemId: 0,
  }

  onClickItem() {
    this.soundService.playSound("select-item.mp3");
  }

  closeOffcanvas() {
    this.soundService.playSound("select-item.mp3");
    this.isOffcanvasOpen = false;
  }

  selectTab(tab: string) {
    this.soundService.playSound("cabinet-door.mp3");
    this.selectedTab = tab;
  }

  onAnimalCardClick(animal: Pet | null) {

  }

  onClickInfo(id: number | null) {
    if (id == null) return;
    this.fruit = this.fruitsService.getFruitById(id)!;
    this.isOffcanvasOpen = true;
    this.soundService.playSound("select-item.mp3");
  }

  onClickCoin() {
    this.soundService.playSound("coinClickEffect2.mp3");
  }

  confirmBuy(pet: PetTypeDto | null) {
    console.log("ac" + pet?.petId);
    if(pet == null)return;
    this.soundService.playSound("select-item.mp3");
    this.quantity = 1;
    this.quantityError = null;
    this.modalRef?.close();
    this.messageService.add({severity: 'success', summary: 'Gekauft!', detail: 'Das Item wurde erfolgreich gekauft.'});
    this.shopService.buyPet(pet.petId);
    console.log(this.body)
    console.log(pet)
  }

  sendBoughtItemsToBackend(fruit: FruitInterface | null) {
    if (fruit !== null) {
      this.body.amount = this.quantity;
      this.body.itemId = fruit.id;
      this.body.playerId = this.authContextService.getUserId()
    }

    if (this.body.playerId !== null) {
      console.log("es wurde gekauft: " + this.body);
    }
  }

  openBuyModal(pet: PetTypeDto) {
    this.selectedAnimal = pet;
    this.soundService.playSound("select-item.mp3");
    this.modalRef = this.modalService.open(this.buyModal, {
      centered: true,
      backdrop: "static",
      keyboard: false
    });
    this.quantity = 1;
    this.quantityError = null;
  }

}
