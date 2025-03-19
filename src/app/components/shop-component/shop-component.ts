import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-shop-component',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, InputNumber, FormsModule, Toast],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css',
  providers: [MessageService]
})
export class ShopComponent implements OnInit {

  private selectItemAudio!: HTMLAudioElement;
  private switchButtonAudio!: HTMLAudioElement;
  private coinItemAudio!: HTMLAudioElement;
  protected selectedTab: string = "buy";
  protected isOffcanvasOpen: boolean = false;
  protected items = new Array(15);
  protected buyTitle: string = "Magische Ketchup kaufen";
  @ViewChild('buyModal') buyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;
  protected quantity: number = 1;
  protected quantityError: string | null = null;


  constructor(private modalService: NgbModal, private messageService: MessageService) {}

  ngOnInit(): void {
    this.selectItemAudio = new Audio("select-item.mp3"); this.selectItemAudio.load();
    this.switchButtonAudio = new Audio("cabinet-door.mp3"); this.switchButtonAudio.load();
    this.coinItemAudio = new Audio("coinClickEffect2.mp3"); this.coinItemAudio.load();
  }

  onClickItem() {
    this.selectItemAudio.currentTime = 0;
    this.selectItemAudio.play();
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

  selectTab(tab: string) {
    this.switchButtonAudio.currentTime = 0;
    this.switchButtonAudio.play();
    this.selectedTab = tab;
  }

  onClickInfo(index: number) {
    this.isOffcanvasOpen = true;
    console.log(index);
    this.selectItemAudio.currentTime = 0;
    this.selectItemAudio.play()
  }

  onClickCoin() {
    this.coinItemAudio.currentTime = 0;
    this.coinItemAudio.play();
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
    this.quantity = 1;
    this.quantityError = null;
    this.modalRef?.close();
    this.selectItemAudio.currentTime = 0;
    this.selectItemAudio.play();
    this.messageService.add({ severity: 'success', summary: 'Gekauft!', detail: 'Das Item wurde erfolgreich gekauft.' });
  }
  openBuyModal() {
    this.modalRef = this.modalService.open(this.buyModal, {
      centered: true,
      backdrop: "static",
      keyboard: false
    });
    this.quantity = 1;
    this.quantityError = null;
    this.selectItemAudio.currentTime = 0;
    this.selectItemAudio.play()
  }

  closeModal() {
    this.modalRef?.close();
    this.modalRef = undefined;
    this.quantity = 1;
    this.quantityError = null;
    this.selectItemAudio.currentTime = 0;
    this.selectItemAudio.play()
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Dies ist eine Toast-Nachricht!' });
  }
}
