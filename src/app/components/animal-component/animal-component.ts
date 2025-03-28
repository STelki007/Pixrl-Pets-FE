import { Component } from '@angular/core';
import {CoinComponent} from '../coin-component/coin-component';
import {ArrowService} from '@services/animal/ArrowService';
import {SideBarButtonsService} from '@services/SideBarButtonsService';

@Component({
  selector: 'app-animal-component',
  imports: [
    CoinComponent
  ],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent {
  private arrowServiceValue: boolean = false;

  constructor(private  arrowService: ArrowService,
              private sideBarButtonsService: SideBarButtonsService) {}

  onArrowClick() {
    this.arrowService.setValue(false);
    this.arrowService.getValue().subscribe(value => {
      this.arrowServiceValue = value;
    })
    if (this.arrowServiceValue) {
      this.sideBarButtonsService.setValue("animal");
    }else{
      this.sideBarButtonsService.setValue("animals")
    }
  }
}
