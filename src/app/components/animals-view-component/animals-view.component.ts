import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {ArrowService} from '@services/animal/ArrowService';
import {SoundService} from '@services/SoundService';
import {SelectedAnimalServiceService} from '@services/animal/selected-animal-service.service';
import {Pet, PetType} from '@components/animal-component/service/Pet';

@Component({
  selector: 'app-animals-view-component',
  imports: [
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './animals-view.component.html',
  standalone: true,
  styleUrl: './animals-view.component.css'
})
export class AnimalsViewComponent implements OnInit {
  items = Array(20).fill(0);
  private chickenAudiosArr: string[] = ["chickenSoundEffect2.mp3", "chickenSoundEffect3.mp3"];
  animalList: Array<Pet> = [];

  chicken: Pet = Pet.getTestAnimal(PetType.chicken);

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private soundService: SoundService,
    private selectedAnimalService: SelectedAnimalServiceService
  ) {
  }

  ngOnInit(): void {
    this.animalList.push(this.chicken);
    this.animalList.push(Pet.getTestAnimal(PetType.cow));
    this.animalList.push(Pet.getTestAnimal(PetType.pig));
    this.animalList.push(Pet.getTestAnimal(PetType.sheep));

  }

  generateRandomChickenAudio() {
    let index = Math.floor(Math.random() * this.chickenAudiosArr.length);
    this.soundService.playSound(this.chickenAudiosArr[index]);
  }

  onAnimalCardClick(animal: Pet) {
    this.generateRandomChickenAudio();
    this.selectedAnimalService.setSelectedAnimal(animal);
    this.sideBarButtonsService.setValue("animal");
    this.arrowService.setValue(true);
  }


}
