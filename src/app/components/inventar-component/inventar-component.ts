import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {audit} from 'rxjs';
import {SoundService} from '@services/SoundService';
import {FruitInterface} from '@components/inventar-component/FruitInterface';
import {FruitsService} from '@services/fruits.service';

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

  constructor(
    private soundService: SoundService,
    protected fruitService: FruitsService,

  ) {
  }

  ngOnInit(): void {

  }

  onClickItem(fruit: FruitInterface) {
    this.soundService.playSound("select-item.mp3")
    console.log(fruit)
  }


}
