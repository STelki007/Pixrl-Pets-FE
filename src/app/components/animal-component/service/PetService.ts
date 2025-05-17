import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SoundService} from '@services/SoundService';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class PetService {
  private PetName = new BehaviorSubject<string>("cow");

  constructor(
    private soundService: SoundService,

  ) {
  }

  getValue(): Observable<string> {
    return this.PetName.asObservable();
  }

  setValue(value: string) {
    this.PetName.next(value);
  }

  getAnimalSoundEffect(animal: string) {
    switch (animal.toLowerCase()) {
      case "chicken":
        this.soundService.playSound("chickenSoundEffect3.mp3");
        break;
      case "cow":
        this.soundService.playSound("cow-sound.mp3");
        break;
      case "sheep":
        this.soundService.playSound("sheep-sound.mp3");
        break;
      case "pig":
        this.soundService.playSound("pig-sound.mp3");
        break;
    }
  }
}
