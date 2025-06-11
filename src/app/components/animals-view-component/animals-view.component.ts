import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {SideBarButtonsService} from '@services/SideBarButtonsService';
import {ArrowService} from '@services/animal/ArrowService';
import {SelectedAnimalServiceService} from '@services/animal/selected-animal-service.service';
import {Pet, PetType} from '@components/animal-component/service/Pet';
import {PetService} from '@components/animal-component/service/PetService';
import {OwnedPetService} from '@services/animal/OwnedPetService';
import {PlayerPetDto} from '@services/animal/PlayerPetDto';
import {PetCulture} from '@components/animal-component/service/PetCulture';

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
    private ownedPetService: OwnedPetService
  ) {
  }

  ngOnInit(): void {
    console.log("test");
    // this.animalList.push(this.chicken);
    // this.animalList.push(Pet.getTestAnimal(PetType.cow));
    // this.animalList.push(Pet.getTestAnimal(PetType.pig));
    // this.animalList.push(Pet.getTestAnimal(PetType.sheep));
    // Load from backend
    this.ownedPetService.getPets().subscribe(
      (pets: PlayerPetDto[]) => {
        let l: Pet[] = [];
        pets.forEach(pet => {
          l.push(new Pet(pet.id, pet.userId, pet.name, PetType[pet.type as keyof typeof PetType], {
            hunger: 10,
            weight: 10,
            socialSkill: 10,
            strengthSpeed: 10,
            humor: 10,
            curiosity: 10,
            tiredness: 10,
            intelligence: 10,
            confidence: 10,
            stamina: 10,
            dexterity: 10,
            affection: 10,
            moneyProduction: 10,
            hateful: 0,
            history: PetCulture.sheep()
          }, 100));
        });
        this.animalList = l;
      },
      (error: any) => {
        console.error('Failed to load pets:', error);
      }
    );
    this.ownedPetService.loadData();
  }


  onAnimalCardClick(animal: Pet) {
    this.petService.getAnimalSoundEffect(animal.getType().toString());
    this.selectedAnimalService.setSelectedAnimal(animal);
    this.sideBarButtonsService.setValue("animal");
    this.arrowService.setValue(true);
    this.petService.setValue(animal.getName());
  }


}
