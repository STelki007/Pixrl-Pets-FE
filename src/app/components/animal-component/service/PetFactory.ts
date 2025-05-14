import {Pet, PetType} from '@components/animal-component/service/Pet';
import {PetCulture} from '@components/animal-component/service/PetCulture';

export class PetFactory {
  static createPet(type: string): Pet {
    switch (type) {
      case 'chicken':
        return new Pet(0,'0','chicken', PetType.chicken,{
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
      case 'cow':
        return new Pet(0,'0','cow', PetType.cow,{
          hunger: 3,
          weight: 5,
          socialSkill: 8,
          strengthSpeed: 9,
          humor: 6,
          curiosity: 7,
          tiredness: 1,
          intelligence: 1,
          confidence: 8,
          stamina: 9,
          dexterity: 5,
          affection: 10,
          moneyProduction: 1,
          hateful: 10,
          history: PetCulture.cow()
        });
      case 'sheep':
        return new Pet(0,'0','sheep', PetType.sheep,{
          hunger: 2,
          weight: 1,
          socialSkill: 6,
          strengthSpeed: 4,
          humor: 9,
          curiosity: 10,
          tiredness: 2,
          intelligence: 8,
          confidence: 5,
          stamina: 6,
          dexterity: 7,
          affection: 9,
          moneyProduction: 3,
          hateful: 0,
          history: PetCulture.sheep()
        });

      case 'pig':
        return new Pet(0,'0','pig', PetType.pig,{
          hunger: 8,
          weight: 4,
          socialSkill: 1,
          strengthSpeed: 7,
          humor: 10,
          curiosity: 4,
          tiredness: 2,
          intelligence: 8,
          confidence: 5,
          stamina: 2,
          dexterity: 8,
          affection: 10,
          moneyProduction: 5,
          hateful: 0,
          history: PetCulture.pig()
        });

      default:
        throw new Error('Unknown pet type');
    }
  }

  static convertObjectToPetString(pet: Pet): string {
    return ` du bist ${pet.getName()}. dein Zustand ist:\\n${JSON.stringify(pet.getStats(), null, 2)}\n`
  }
}
