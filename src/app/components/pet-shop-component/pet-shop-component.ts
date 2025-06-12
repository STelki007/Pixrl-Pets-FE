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
import {PlayerCoinService} from "@/app/backend/player/player.coin.service";
import {PlayerBackendService} from '@/app/backend/player/player.backend.service';

@Component({
  selector: 'app-pet-shop-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, FormsModule, Toast, NgStyle],
  templateUrl: './pet-shop-component.html',
  styleUrl: './pet-shop-component.css',
  providers: [MessageService]
})
export class PetShopComponent implements OnInit {
  @ViewChild('buyModal') buyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  private alertText = ""
  private severity = "";
  protected quantityError: string | null = null;
  private petTypes$: Observable<PetTypeDto[]> = new Observable<PetTypeDto[]>;
  protected pets: PetTypeDto[] = [];
  protected petCost: number = 8000;
  protected canPlayerBuyPet: boolean = false;

  @Output() componentSelected  = new EventEmitter<string>();


  selectedAnimal: any = null;

  constructor(private modalService: NgbModal,
              private messageService: MessageService,
              private soundService: SoundService,
              private petTypeServiceService: PetTypeServiceService,
              private shopService: ShopBackendService,
              protected playerCoinsService: PlayerCoinService,
              private playerBackendService: PlayerBackendService,
              ) {
  }

  ngOnInit(): void {
    this.getPets();
    this.checkPlayerHasEnoughCoins();
  }

  getPets () {
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

  onAnimalCardClick(animal: Pet | null) {

  }

  emitSelectComponent(comp: string) {
    this.componentSelected.emit(comp);
  }

  checkPlayerHasEnoughCoins() {
    this.playerCoinsService.playerCoins$.subscribe(playerCoins => {
      if (playerCoins >= this.petCost) {
        this.canPlayerBuyPet = true;
        this.alertText = 'Haustier wurde erfolgreich gekauft.';
        this.severity = "success";
      } else {
        this.canPlayerBuyPet = false;
        this.alertText = 'Du hast nicht genug Coins!';
        this.severity = "error";
      }
    });
    this.playerCoinsService.loadPlayerCoins()
  }


  onClickCoin() {
    this.soundService.playSound("coinClickEffect2.mp3");
  }

  confirmBuy(pet: PetTypeDto | null) {

    if(pet == null)return;
    this.soundService.playSound("select-item.mp3");
    this.quantityError = null;
    this.modalRef?.close();
    this.messageService.add({severity: this.severity, detail: this.alertText});
    if (this.canPlayerBuyPet){
      this.shopService.buyPet(pet.petId);
      this.pets = this.pets.filter(p => p.petId !== pet.petId);
      this.checkPlayerHasEnoughCoins();
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
    this.quantityError = null;
  }

}
