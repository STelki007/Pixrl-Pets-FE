import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Image} from 'primeng/image';
import {SoundService} from '@services/SoundService';

@Component({
  selector: 'app-shop-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, InputNumber, FormsModule, Toast],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css',
  providers: [MessageService]
})
export class ShopComponent implements OnInit {
  protected selectedTab: string = "buy";
  protected isOffcanvasOpen: boolean = false;
  protected items = new Array(15);
  @ViewChild('buyModal') buyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  protected quantity: number = 1;
  protected quantityError: string | null = null;


  constructor(private modalService: NgbModal,
              private messageService: MessageService,
              private soundService: SoundService,
) {}

  ngOnInit(): void {
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

  onClickInfo() {
    this.isOffcanvasOpen = true;
    this.soundService.playSound("select-item.mp3");
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
    this.quantity = 1;
    this.quantityError = null;
    this.modalRef?.close();
    this.messageService.add({ severity: 'success', summary: 'Gekauft!', detail: 'Das Item wurde erfolgreich gekauft.' });
  }
  openBuyModal() {
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
