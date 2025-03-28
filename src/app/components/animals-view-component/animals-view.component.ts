import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {ArrowService} from '@services/animal/ArrowService';

@Component({
  selector: 'app-animals-view-component',
  imports: [
    NgForOf
  ],
  templateUrl: './animals-view.component.html',
  styleUrl: './animals-view.component.css'
})
export class AnimalsViewComponent implements OnInit {
  items = Array(20).fill(0);
  private chickenAudio = HTMLAudioElement;
  private chickenAudiosArr:string[] = ["chickenSoundEffect2.mp3", "chickenSoundEffect3.mp3"];

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService
    ) {}

  ngOnInit(): void {
    this.generateRandomChickenAudio();
  }

  generateRandomChickenAudio() {
    let index = Math.floor(Math.random() * this.chickenAudiosArr.length);
    this.chickenAudio = new Audio(this.chickenAudiosArr[index]);
    this.chickenAudio.volume = 1;
  }

  onAnimalCardClick() {
    this.generateRandomChickenAudio();
    this.chickenAudio.currentTime = 0;
    this.chickenAudio.play();
    this.sideBarButtonsService.setValue("animal");
    this.arrowService.setValue(true);
  }

}
