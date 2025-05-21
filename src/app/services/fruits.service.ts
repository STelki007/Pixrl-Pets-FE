import {Injectable} from '@angular/core';
import {FruitInterface} from '@components/inventar-component/FruitInterface';

@Injectable({
  providedIn: 'root'
})

export class FruitsService {
  private readonly fruits: FruitInterface[] = [
    {
      id: 1,
      name: 'Verdorbener Apfel',
      imageName: 'food/apple.png',
      description: 'Ein roter Apfel, einfach und doch schwer. Einst genossen von einem König, dessen Name aus der Geschichte gestrichen wurde.'
    },
    {
      id: 3,
      name: 'Kokosnuss der Stille',
      imageName: 'food/coco.png',
      description: 'Ihre Schale trägt das Echo ferner Küstenreiche, deren Sand vom Blut der Entfesselten getränkt wurde.'
    },
    {
      id: 4,
      name: 'Blutbeeren',
      imageName: 'food/erdbeeren.png',
      description: 'Ein süßer Genuss, gereift im Nebel eines ewigen Frühlings. Man sagt, sie wuchsen zuerst an Gräbern.'
    },
    {
      id: 5,
      name: 'Verfluchter Apfel',
      imageName: 'food/magic-apple.png',
      description: 'Schimmernd im Zwielicht, eine Frucht der Alten Ordnung. Ihre Kraft verführt die Sterblichen – und verzehrt sie zugleich.'
    },
    {
      id: 6,
      name: 'Gelbe Frucht des Wahnsinns',
      imageName: 'food/magic-bananne.png',
      description: 'Eine grotesk leuchtende Frucht. Entstanden aus einer Laune der Götter, verstoßen von der Erde selbst.'
    },
    {
      id: 7,
      name: 'Nachtfrucht',
      imageName: 'food/magic-food.png',
      description: 'Niemand kennt ihren Ursprung. Die wenigen, die davon kosteten, sprechen in Zungen – oder schweigen für immer.'
    },
    {
      id: 8,
      name: 'Sonnenkugel',
      imageName: 'food/orange.png',
      description: 'Leuchtend wie ein vergehender Stern. Ihre Schale verströmt einen Duft, der längst vergessene Träume weckt.'
    },
    {
      id: 9,
      name: 'Pflaume der Dämmerung',
      imageName: 'food/plum.png',
      description: 'Klein und dunkel. Sie reifte in der Dämmerung eines Zeitalters, das nie begann.'
    },
    {
      id: 10,
      name: 'Granat des Blutes',
      imageName: 'food/Pomegranate.png',
      description: 'Seine Samen tragen das Siegel alter Bündnisse. Oft als Gabe der Toten gereicht, nie ohne Preis.'
    },
    {
      id: 11,
      name: 'Kürbis der Verlassenen',
      imageName: 'food/Pumpkin.png',
      description: 'Ausgehöhlt in uralten Ritualen. In seinem Innern flackert die Erinnerung an verlorene Flammen.'
    },
    {
      id: 14,
      name: 'Avocado der Titanen',
      imageName: 'food/avocado.png',
      description: 'Grün wie das Herz der Welt. Angeblich ein Fragment jener Frucht, die einst die Titanen nährte.'
    },
    {
      id: 15,
      name: 'Schlafende Kiwi',
      imageName: 'food/kiwi.png',
      description: 'Ein pelziges Relikt aus vergessenen Gärten. Ihre Mitte birgt eine uralte Trauer.'
    }
  ];

  getFruits() {
    return this.fruits;
  }


  getFruitById(id: number) {
    return this.fruits.find(fruit => fruit.id === id);
  }
}
