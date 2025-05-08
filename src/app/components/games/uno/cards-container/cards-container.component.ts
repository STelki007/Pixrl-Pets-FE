import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import {SoundService} from '@services/SoundService';

@Component({
  selector: 'app-cards-container',
  imports: [NgIf, NgStyle],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.css',
})
export class CardsContainerComponent implements OnInit, OnChanges {
  @Input() card: string | undefined;
  @Input() getCardOutPut: string | undefined;
  @Output() turnEnd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() unoLastCard = new EventEmitter<void>();


  private isFirstCardSet = false;
  private colors = ["red", "green", "blue", "yellow"];
  protected color = "";

  constructor(
    private soundService: SoundService,
  ) {}

  ngOnInit(): void {
    this.checkIsFirstCardSet();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["getCardOutPut"]?.currentValue !== changes["getCardOutPut"]?.previousValue) {
      this.updateCardValue();
    }
  }

  updateCardValue() {
    if (this.isFirstCardSet && this.getCardOutPut) {
      this.card = this.getCardOutPut;
      this.checkGetCardOutPutColor();
    }
  }

  checkIsFirstCardSet() {
    if (!this.isFirstCardSet && this.card) {
      this.isFirstCardSet = true;
    }
  }

  checkGetCardOutPutColor() {
    const colorMapping: { [key: string]: string } = {
      green: "#55AA55",
      blue: "#5555FD",
      yellow: "#FFAA00",
      red: "#FF5555"
    };

    this.color = this.colors.find(color => this.getCardOutPut?.includes(color)) || "";
    this.color = colorMapping[this.color] || this.color;
  }

  onUnoLastCardClick() {
    this.soundService.playSound("uno.mp3")
    this.unoLastCard.emit();
  }
}
