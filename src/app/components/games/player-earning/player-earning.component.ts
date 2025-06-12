import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgIf} from '@angular/common';
import {PlayerBackendService} from '@/app/backend/player/player.backend.service';
import {PlayerCoinService} from '@/app/backend/player/player.coin.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {PlayerWinsTicTacToService} from '@components/games/tic-tac-toe/services/player.wins.tic.tac.to.service';

@Component({
  selector: 'app-player-earning',
  imports: [
    NgIf
  ],
  templateUrl: './player-earning.component.html',
  styleUrl: './player-earning.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlayerEarningComponent implements OnInit, OnDestroy, AfterViewInit {
  protected randomWinCoins: number = 0;
  private modalRef?: NgbModalRef;
  private subscription!: Subscription;

  @ViewChild('PlayerEarning') AlertCenterModal!: TemplateRef<any>;
  @Input() service: any;

  constructor(
    private playerBackendService: PlayerBackendService,
    private playerCoinService: PlayerCoinService,
    private modalService: NgbModal,
    private playerWinsTicTacToService: PlayerWinsTicTacToService
  ) {}

  ngOnInit() {
    this.playerWinsCoins();
  }

  ngAfterViewInit(): void {
    if (this.service) {
      this.subscription = this.service.getValue().subscribe((value: boolean) => {
        if (value) {
          this.openModal(this.AlertCenterModal);
        } else {
          this.closeModal();
        }
      });
    }
  }

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  closeModal() {
    this.modalRef?.close();
    this.modalRef = undefined;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.closeModal();
  }

  playerWinsCoins() {
    const min = 50;
    const max = 750;
    this.randomWinCoins = Math.floor(Math.random() * (max - min + 1)) + min;

    this.playerBackendService.addCoins(this.randomWinCoins).subscribe(() => {
      this.playerCoinService.loadPlayerCoins()
    });
  }

  closeCoinsDiv(): void {
    this.playerWinsTicTacToService.setValue(false);
  }
}
