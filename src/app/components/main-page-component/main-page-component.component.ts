import {Component, OnInit} from '@angular/core';
import {AdoptComponentComponent} from '../adopt-component/adopt-component.component';
import {NgIf} from '@angular/common';
import {SideBarButtonsService} from '../../services/SideBarButtonsService';

@Component({
  selector: 'app-main-page-component',

  imports: [
    AdoptComponentComponent,
    NgIf
  ],
  templateUrl: './main-page-component.component.html',
  styleUrl: './main-page-component.component.css'
})
export class MainPageComponentComponent {

}
