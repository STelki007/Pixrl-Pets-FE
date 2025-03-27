import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-animal-view-component',
  imports: [
    NgForOf
  ],
  templateUrl: './animal-view-component.component.html',
  styleUrl: './animal-view-component.component.css'
})
export class AnimalViewComponentComponent {
  items = Array(20).fill(0);
}
