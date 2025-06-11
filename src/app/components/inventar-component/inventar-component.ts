import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {audit} from 'rxjs';
import {SoundService} from '@services/SoundService';
import {FruitInterface} from '@components/shop-component/FruitInterface';
import {FruitsService} from '@services/fruits.service';
import {InventoryBackendService} from '@/app/backend/inventory/inventory.backend.service';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {ItemsBackendService} from '@/app/backend/items/items.backend.service';

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

  playerObject: any;
  private itemsId: number[] = [];

  protected amount: number = 0;
  playerInventory: any[] = [];

  constructor(
    private soundService: SoundService,
    private inventoryBackendService: InventoryBackendService,
    private itemBackendService: ItemsBackendService
  ) {
  }

  ngOnInit(): void {
    this.GetDataFromInventoryObject()
  }

  GetDataFromInventoryObject() {
    this.inventoryBackendService.getInventoryByPlayerSessionId().subscribe(object => {
      this.playerObject = object;

      this.itemsId.push(this.playerObject.itemId);

      this.playerObject.map((i: any) => {
        if (i){
          this.getPlayerInventory(i.itemId, i.amount);
        }
      });

    });
  }


  getPlayerInventory(id: any, amount: any) {
    this.itemBackendService.getItemById(id).subscribe(inventoryItem => {
      const itemWithAmount = {
        ...inventoryItem,
        amount: amount
      };
      this.playerInventory.push(itemWithAmount);
      console.log(this.playerInventory);
    });
  }


  onClickItem(fruit: FruitInterface) {
    this.soundService.playSound("select-item.mp3")
    console.log(fruit)
  }


}
