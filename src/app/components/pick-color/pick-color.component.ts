import {Component, EventEmitter, Output} from '@angular/core';
import {AlertCenterModalComponent} from '@components/modal/alert-center-modal-component/alert-center-modal-component';
import {PickColorService} from '@services/pickColor/PickColorService';

@Component({
  selector: 'app-pick-color',
  imports: [
    AlertCenterModalComponent
  ],
  templateUrl: './pick-color.component.html',
  styleUrl: './pick-color.component.css'
})
export class PickColorComponent {
  @Output() colorSelected = new EventEmitter<string>();

  constructor(protected pickColorService: PickColorService) {
  }


  selectColor(color: string) {
    this.colorSelected.emit(color);
    this.pickColorService.setValue(false)
  }
}
