import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-animal-view-component',
  imports: [
    NgForOf
  ],
  templateUrl: './animal-view-component.component.html',
  styleUrl: './animal-view-component.component.css'
})
export class AnimalViewComponentComponent implements OnInit {
  items = Array(20).fill(0);
  private chickenAudio: HTMLAudioElement;
  private chickenAudiosArr:string[] = ["chickenSoundEffect.mp3", "chickenSoundEffect2.mp3", "chickenSoundEffect3.mp3"];

  constructor() {
    let index = Math.floor(Math.random() * this.chickenAudiosArr.length);
    this.chickenAudio = new Audio(this.chickenAudiosArr[index]);
  }

  ngOnInit(): void {
    this.generateRandomChickenAudio();
  }

  generateRandomChickenAudio() {
    let index = Math.floor(Math.random() * this.chickenAudiosArr.length);
    this.chickenAudio = new Audio(this.chickenAudiosArr[index]);
    console.log(index)
  }

  onItemClick() {
    this.generateRandomChickenAudio();
    this.chickenAudio.currentTime = 0;
    this.chickenAudio.play();
  }

}
