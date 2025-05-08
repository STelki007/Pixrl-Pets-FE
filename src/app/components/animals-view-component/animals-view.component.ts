import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {ArrowService} from '@services/animal/ArrowService';
import {SoundService} from '@services/SoundService';

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
  private chickenAudiosArr:string[] = ["chickenSoundEffect2.mp3", "chickenSoundEffect3.mp3"];

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private soundService: SoundService
    ) {}

  ngOnInit(): void {
  }

  generateRandomChickenAudio() {
    let index = Math.floor(Math.random() * this.chickenAudiosArr.length);
    this.soundService.playSound(this.chickenAudiosArr[index]);
  }

  onAnimalCardClick() {
    this.generateRandomChickenAudio();
    this.sideBarButtonsService.setValue("animal");
    this.arrowService.setValue(true);
    }


}
