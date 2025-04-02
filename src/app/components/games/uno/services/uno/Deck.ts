import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Deck {
  protected deck: string[] = [
    "assets/figmaUnoCard0-9/blue-0.svg",
    "assets/figmaUnoCard0-9/blue-1.svg", "assets/figmaUnoCard0-9/blue-2.svg",
    "assets/figmaUnoCard0-9/blue-3.svg", "assets/figmaUnoCard0-9/blue-4.svg",
    "assets/figmaUnoCard0-9/blue-5.svg", "assets/figmaUnoCard0-9/blue-6.svg",
    "assets/figmaUnoCard0-9/blue-7.svg", "assets/figmaUnoCard0-9/blue-8.svg",
    "assets/figmaUnoCard0-9/blue-9.svg", "assets/figmaUnoCard0-9/blueStop.svg",
    "assets/figmaUnoCard0-9/blue2cards.svg", "assets/figmaUnoCard0-9/blue-arrow.svg",

    "assets/figmaUnoCard0-9/green-0.svg", "assets/figmaUnoCard0-9/green-1.svg",
    "assets/figmaUnoCard0-9/green-2.svg", "assets/figmaUnoCard0-9/green2cards.svg",
    "assets/figmaUnoCard0-9/green-3.svg", "assets/figmaUnoCard0-9/green-4.svg",
    "assets/figmaUnoCard0-9/green-5.svg", "assets/figmaUnoCard0-9/green-6.svg",
    "assets/figmaUnoCard0-9/green-7.svg", "assets/figmaUnoCard0-9/green-8.svg",
    "assets/figmaUnoCard0-9/green-9.svg", "assets/figmaUnoCard0-9/greenStop.svg",
    "assets/figmaUnoCard0-9/green-arrow.svg",

    "assets/figmaUnoCard0-9/red-0.svg", "assets/figmaUnoCard0-9/red-1.svg",
    "assets/figmaUnoCard0-9/red-3.svg", "assets/figmaUnoCard0-9/red-4.svg",
    "assets/figmaUnoCard0-9/red-5.svg", "assets/figmaUnoCard0-9/red-6.svg",
    "assets/figmaUnoCard0-9/red-7.svg", "assets/figmaUnoCard0-9/red-8.svg",
    "assets/figmaUnoCard0-9/red-2.svg", "assets/figmaUnoCard0-9/red2cards.svg",
    "assets/figmaUnoCard0-9/red-arrow.svg",

    "assets/figmaUnoCard0-9/red-9.svg", "assets/figmaUnoCard0-9/redStop.svg",
    "assets/figmaUnoCard0-9/yellow-0.svg", "assets/figmaUnoCard0-9/yellow-1.svg",
    "assets/figmaUnoCard0-9/yellow-2.svg", "assets/figmaUnoCard0-9/yellow-3.svg",
    "assets/figmaUnoCard0-9/yellow2cards.svg", "assets/figmaUnoCard0-9/yellow-4.svg",
    "assets/figmaUnoCard0-9/yellow-5.svg", "assets/figmaUnoCard0-9/yellow-6.svg",
    "assets/figmaUnoCard0-9/yellow-7.svg", "assets/figmaUnoCard0-9/yellow-8.svg",
    "assets/figmaUnoCard0-9/yellow-9.svg", "assets/figmaUnoCard0-9/yellowStop.svg",
    "assets/figmaUnoCard0-9/yellow-9.svg", "assets/figmaUnoCard0-9/yellow-arrow.svg",
  ];
  getDeck (): string[] {
    return this.deck;
  }
}
