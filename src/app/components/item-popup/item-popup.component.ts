
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rollover-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-container" *ngIf="!!items && items.length > 0">
      <div class="popup-content">
        <div
          *ngFor="let item of items"
          class="popup-item"
          (click)="onItemClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-container {
      position: absolute;
      top: 100%;
      left: 0;
      width: 250px;
      max-height: 200px;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      border-radius: 8px;
    }
    .popup-item {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      color:black;
    }
    .popup-item:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class ItemPopupComponent {
  @Input() items: any[] = [];

  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }
}
