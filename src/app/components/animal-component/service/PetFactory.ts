import {Pet} from '@components/animal-component/service/Pet';

export class PetFactory {
  static createPet(type: "cow" | "chicken" | "pig" | "sheep"): Pet {
    switch (type) {
      case 'chicken':
        return new Pet('chicken', {
          hunger: 1,
          weight: 0,
          socialSkill: 9,
          strengthSpeed: 8,
          humor: 7,
          curiosity: 10,
          tiredness: 0,
          intelligence: 9,
          confidence: 6,
          stamina: 10,
          dexterity: 4,
          affection: 8,
          moneyProduction: 2
        });
      case 'cow':
        return new Pet('cow', {
          hunger: 3,
          weight: 5,
          socialSkill: 8,
          strengthSpeed: 9,
          humor: 6,
          curiosity: 7,
          tiredness: 1,
          intelligence: 7,
          confidence: 8,
          stamina: 9,
          dexterity: 5,
          affection: 10,
          moneyProduction: 1
        });
      case 'sheep':
        return new Pet('sheep', {
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
          moneyProduction: 3
        });
      case 'pig':
        return new Pet('pig', {
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
          moneyProduction: 5
        });

      default:
        throw new Error('Unknown pet type');
    }
  }
}
