import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {ArrowService} from '@services/animal/ArrowService';
import {SoundService} from '@services/SoundService';
import {SelectedAnimalServiceService} from '@services/animal/selected-animal-service.service';
import {Pet, PetType} from '@components/animal-component/service/Pet';
import {PetService} from '@components/animal-component/service/PetService';

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
  animalList: Array<Pet> = [];

  chicken: Pet = Pet.getTestAnimal(PetType.chicken);

  constructor(
    private sideBarButtonsService: SideBarButtonsService,
    private arrowService: ArrowService,
    private selectedAnimalService: SelectedAnimalServiceService,
    private petService: PetService,

      ) {
  }

  ngOnInit(): void {
    this.animalList.push(this.chicken);
    this.animalList.push(Pet.getTestAnimal(PetType.cow));
    this.animalList.push(Pet.getTestAnimal(PetType.pig));
    this.animalList.push(Pet.getTestAnimal(PetType.sheep));

  }


  onAnimalCardClick(animal: Pet) {
    console.log(animal.getName())
    this.petService.getAnimalSoundEffect(animal.getName());
    this.selectedAnimalService.setSelectedAnimal(animal);
    this.sideBarButtonsService.setValue("animal");
    this.arrowService.setValue(true);
    this.petService.setValue(animal.getName());
  }


}
