import {Injectable} from '@angular/core';
import {FruitInterface} from '@components/shop-component/FruitInterface';
import {ItemsBackendService} from '@/app/backend/items/items.backend.service';

@Injectable({
  providedIn: 'root'
})

export class FruitsService {
  fruits: FruitInterface[] = [
    { id: 1, name: 'Apfel', imageName: 'food/apple.png', description: 'Ein gewöhnlicher roter Apfel' },
    { id: 3, name: 'Kokosnuss', imageName: 'food/coco.png', description: 'Eine tropische, braune Kokosnuss' },
    { id: 4, name: 'Erdbeeren', imageName: 'food/erdbeeren.png', description: 'Süße, rote Erdbeeren' },
    { id: 5, name: 'Weintrauben', imageName: 'food/grapes.png', description: 'Kleine, violette Früchte in Trauben' },
    { id: 6, name: 'Magischer Apfel', imageName: 'food/magic-apple.png', description: 'Ein leuchtender, verzauberter Apfel' },
    { id: 7, name: 'Magische Banane', imageName: 'food/magic-bananne.png', description: 'Eine leuchtende, verzauberte Banane' },
    { id: 8, name: 'Magisches Obst', imageName: 'food/magic-food.png', description: 'Magisches Obst mit unbekannten Kräften' },
    { id: 9, name: 'Orange', imageName: 'food/orange.png', description: 'Eine saftige, orange Zitrusfrucht' },
    { id: 10, name: 'Pflaume', imageName: 'food/plum.png', description: 'Eine kleine, süße, violette Frucht' },
    { id: 11, name: 'Granatapfel', imageName: 'food/Pomegranate.png', description: 'Eine rote Frucht voller Kerne' },
    { id: 12, name: 'Kürbis', imageName: 'food/Pumpkin.png', description: 'Ein großer, orangefarbener Kürbis – beliebt für Suppen oder Halloween' },
    { id: 13, name: 'Wassermelone', imageName: 'food/watermelone.png', description: 'Eine große, grüne Frucht mit saftigem, rotem Fruchtfleisch' },
    { id: 14, name: 'Kiwi', imageName: 'food/kiwi.png', description: 'Eine kleine, grüne Frucht mit brauner Schale und süß-saurem Geschmack' },
    { id: 16, name: 'Avocado', imageName: 'food/avocado.png', description: 'Eine cremige, grüne Frucht mit einem großen Kern – beliebt in Salaten und Guacamole' },

  ];

  constructor(private itemsBackendService: ItemsBackendService) {
  }


  getAllItems() {
    return this.itemsBackendService.getAllItems();
  }

  getFruitById(id: number) {
    return this.fruits.find(fruit => fruit.id === id);
  }
}
