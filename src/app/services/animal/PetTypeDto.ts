import {Pet, PetType} from '@components/animal-component/service/Pet';
import {PetCulture} from '@components/animal-component/service/PetCulture';

export class PetTypeDto {

  constructor(public type: String, public petId: number, public price: number) {
  }

  public petInstance: Pet | null = null; //pet instance for handling drawing

  getPet(): Pet | null {
    if (this.petInstance != null)
      return this.petInstance;
    let petType = this.getPetType();
    if (petType == null)
      return null;

    this.petInstance = new Pet(this.petId, '-1', petType.toString(), petType, {
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
      history: PetCulture.chicken()
    });
    return this.petInstance;
  }

  getPetType(): PetType | null {
    switch (this.type) {
      case 'chicken':
        return PetType.chicken;
      case 'pig':
        return PetType.pig;
      case 'cow':
        return PetType.cow;
      case 'sheep':
        return PetType.sheep;
    }
    return null;
  }
}
