import { Component, OnDestroy, OnInit } from '@angular/core';
import {SideBarButtonsService} from '../../services/SideBarButtonsService';

@Component({
  selector: 'app-coin-component',
  templateUrl: './coin-component.html',
  styleUrls: ['./coin-component.css']
})
export class CoinComponent implements OnInit, OnDestroy {
  timeLeft: string = '';
  private timerInterval: any;
  isClaimable: boolean = false;

  constructor(private sideBarButtonsService: SideBarButtonsService) {
  }

  ngOnInit(): void {
    this.updateTimer();
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  private updateTimer(): void {
    const now = new Date();
    const nextReset = new Date();
    nextReset.setUTCHours(0, 0, 0, 0);

    if (now >= nextReset) {
      nextReset.setDate(nextReset.getDate() + 1);
    }

    const timeDiff = nextReset.getTime() - now.getTime();

    if (timeDiff <= 0) {
      clearInterval(this.timerInterval);
      this.timeLeft = '00:00:00';
      this.isClaimable = true;
    } else {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      this.timeLeft = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
    }
  }

  claimDailyCoins(): void {
    if (this.isClaimable) {
      this.isClaimable = false;
      this.timeLeft = '24:00:00';

      setTimeout(() => {
        this.updateTimer();
        this.startTimer();
      }, 1000);
    }
  }

  onCoinsClick() {
    const audio = new Audio("coinClickEffect2.mp3");
    audio.volume = 1;

    audio.play().then(() => {
      audio.onended = () => {
        this.sideBarButtonsService.setValue("shop");
      };
    })
  }
}
