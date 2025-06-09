import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {audit} from 'rxjs';
import {SoundService} from '@services/SoundService';
import {FruitInterface} from '@components/shop-component/FruitInterface';
import {FruitsService} from '@services/fruits.service';
import {InventoryBackendService} from '@/app/backend/interfaces/inventory/inventory.backend.service';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Component({
  selector: 'app-inventar-component',
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './inventar-component.html',
  styleUrl: './inventar-component.css'
})
export class InventarComponent implements OnInit {

  playerInventory: any;

  constructor(
    private soundService: SoundService,
    protected fruitService: FruitsService,
    private inventoryBackendService: InventoryBackendService,
    private authContextService: AuthContextService
  ) {
  }


  ngOnInit(): void {
    this.getPlayerInventory()
  }

  getPlayerInventory() {
    const sessionId = this.authContextService.getSessionId();
    this.inventoryBackendService.getInventoryByPlayerSessionId(sessionId).subscribe(inventory => {
      this.playerInventory = inventory;
    })
  }

  onClickItem(fruit: FruitInterface) {
    this.soundService.playSound("select-item.mp3")
    console.log(fruit)
  }


}
