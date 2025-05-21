import {Injectable} from '@angular/core';
import {FruitInterface} from '@components/inventar-component/FruitInterface';

@Injectable({
  providedIn: 'root'
})

export class FruitsService {
  private readonly fruits: FruitInterface[] = [
    {
      id: 1,
      name: 'Apfel',
      imageName: 'food/apple.png',
      gif: '/assets/darkSouls/dark-souls-1.gif',
      description: 'Ein roter Apfel, einfach und doch schwer. Einst genossen von einem König, dessen Name aus der Geschichte gestrichen wurde.'
    },
    {
      id: 3,
      name: 'Kokosnuss',
      imageName: 'food/coco.png',
      gif: '/assets/darkSouls/dark-souls-2.gif',
      description: 'Ihre Schale trägt das Echo ferner Küstenreiche, deren Sand vom Blut der Entfesselten getränkt wurde.'
    },
    {
      id: 4,
      name: 'Erdbeeren',
      imageName: 'food/erdbeeren.png',
      gif: '/assets/darkSouls/dark-souls-3.gif',
      description: 'Ein süßer Genuss, gereift im Nebel eines ewigen Frühlings. Man sagt, sie wuchsen zuerst an Gräbern.'
    },
    {
      id: 5,
      name: 'Magischer Apfel',
      imageName: 'food/magic-apple.png',
      gif: '/assets/darkSouls/dark-souls-4.gif',
      description: 'Schimmernd im Zwielicht, eine Frucht der Alten Ordnung. Ihre Kraft verführt die Sterblichen – und verzehrt sie zugleich.'
    },
    {
      id: 6,
      name: 'Magische Banane',
      imageName: 'food/magic-bananne.png',
      gif: '/assets/darkSouls/dark-souls-5.gif',
      description: 'Eine grotesk leuchtende Frucht. Entstanden aus einer Laune der Götter, verstoßen von der Erde selbst.'
    },
    {
      id: 7,
      name: 'Magische Frucht',
      imageName: 'food/magic-food.png',
      gif: '/assets/darkSouls/dark-souls-6.gif',
      description: 'Niemand kennt ihren Ursprung. Die wenigen, die davon kosteten, sprechen in Zungen – oder schweigen für immer.'
    },
    {
      id: 8,
      name: 'Orange',
      imageName: 'food/orange.png',
      gif: '/assets/darkSouls/dark-souls-7.gif',
      description: 'Leuchtend wie ein vergehender Stern. Ihre Schale verströmt einen Duft, der längst vergessene Träume weckt.'
    },
    {
      id: 9,
      name: 'Pflaume',
      imageName: 'food/plum.png',
      gif: '/assets/darkSouls/dark-souls-8.gif',
      description: 'Klein und dunkel. Sie reifte in der Dämmerung eines Zeitalters, das nie begann.'
    },
    {
      id: 10,
      name: 'Granatapfel',
      imageName: 'food/Pomegranate.png',
      gif: '/assets/darkSouls/dark-souls-9.gif',
      description: 'Seine Samen tragen das Siegel alter Bündnisse. Oft als Gabe der Toten gereicht, nie ohne Preis.'
    },
    {
      id: 11,
      name: 'Kürbis',
      imageName: 'food/Pumpkin.png',
      gif: '/assets/darkSouls/dark-souls-10.gif',
      description: 'Ausgehöhlt in uralten Ritualen. In seinem Innern flackert die Erinnerung an verlorene Flammen.'
    },
    {
      id: 12,
      name: 'Avocado',
      imageName: 'food/avocado.png',
      gif: '/assets/darkSouls/nito.gif',
      description: 'Grün wie das Herz der Welt. Angeblich ein Fragment jener Frucht, die einst die Titanen nährte.'
    },
    {
      id: 13,
      name: 'Kiwi',
      imageName: 'food/kiwi.png',
      gif: '/assets/darkSouls/dark-souls-1.gif',
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
