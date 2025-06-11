import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SoundService} from '@services/SoundService';
import {ShopBackendService} from '@/app/backend/shop/shop.backend.service';
import {ItemsBackendService} from '@/app/backend/items/items.backend.service';
import {PlayerCoinService} from '@/app/backend/player/player.coin.service';
import {PetShopComponent} from '@components/pet-shop-component/pet-shop-component';
import {BuyCoinsComponent} from '@components/buy-coins/buy-coins.component';

@Component({
  selector: 'app-shop-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, InputNumber, FormsModule, Toast, PetShopComponent, BuyCoinsComponent],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css',
  providers: [MessageService]
})
export class ShopComponent implements OnInit {
  protected selectedTab: string = "buy";
  protected isOffcanvasOpen: boolean = false;
  @ViewChild('buyModal') buyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  protected quantity: number = 1;
  protected quantityError: string | null = null;
  protected itemsArr: any;
  protected getItem: any = {}


  constructor(private modalService: NgbModal,
              private messageService: MessageService,
              private soundService: SoundService,
              private shopBackendService: ShopBackendService,
              private itemBackendService: ItemsBackendService,
              private playerCoinsService: PlayerCoinService,
) {}

  @Output() componentSelected  = new EventEmitter<string>();

  emitSelectComponent(comp: string) {
    this.selectedTab = comp;
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    return this.itemBackendService.getAllItems().subscribe(items => {
      this.itemsArr = items;
      this.itemsArr = this.itemsArr.filter((item: any) => item.image !== null);
    })
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

  onClickInfo(item: any) {
    this.getItem = item;
    this.isOffcanvasOpen = true;
    this.soundService.playSound("select-item.mp3");
    console.log(item)
  }

  onClickCoin() {
    this.soundService.playSound("coinClickEffect2.mp3");
  }

  validateQuantity() {
    if (this.quantity > 50) {
      this.quantityError = "Maximale Bestellmenge ist 50!";
    } else {
      this.quantityError = null;
    }
  }

  confirmBuy() {
    if (this.quantity > 50) {
      this.quantityError = "Maximale Bestellmenge ist 50!";
      return;
    }
    if (this.quantity <= 0) {
      this.quantityError = "Minimale Bestellmenge ist 1!";
      return;
    }
    this.soundService.playSound("select-item.mp3");
    this.quantityError = null;
    this.modalRef?.close();
    this.messageService.add({ severity: 'success', summary: 'Gekauft!', detail: 'Das Item wurde erfolgreich gekauft.' });

    if (this.getItem ) {
      this.sendBoughtItemsToBackend(this.getItem);
      this.playerCoinsService.loadPlayerCoins()
    }
  }

  sendBoughtItemsToBackend(item: any) {
    if (item !== null) {
      this.shopBackendService.sendBoughtItemsToPlayerInventory(item.id, this.quantity).subscribe();
    }
  }

  openBuyModal(item: any) {
    this.soundService.playSound("select-item.mp3");
    this.modalRef = this.modalService.open(this.buyModal, {
      centered: true,
      backdrop: "static",
      keyboard: false
    });
    this.quantity = 1;
    this.quantityError = null;
    this.getItem = item;
  }

  onBuyCoinsClick(buyCoins: string) {
    this.selectedTab = buyCoins;
  }
}
