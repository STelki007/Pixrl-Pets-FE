import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Deck {
  protected deck: string[] = [
    "figmaUnoCard0-9/blue-0.svg",
    "figmaUnoCard0-9/blue-1.svg",
    "figmaUnoCard0-9/blue-2.svg",
    "figmaUnoCard0-9/blue-3.svg",
    "figmaUnoCard0-9/blue-4.svg",
    "figmaUnoCard0-9/blue-5.svg",
    "figmaUnoCard0-9/blue-6.svg",
    "figmaUnoCard0-9/blue-7.svg",
    "figmaUnoCard0-9/blue-8.svg",
    "figmaUnoCard0-9/blue-9.svg",
    "figmaUnoCard0-9/blueStop.svg",
    "figmaUnoCard0-9/blue2cards.svg",
    "figmaUnoCard0-9/blue-arrow.svg",

    "figmaUnoCard0-9/green-0.svg",
    "figmaUnoCard0-9/green-1.svg",
    "figmaUnoCard0-9/green-2.svg",
    "figmaUnoCard0-9/green2cards.svg",
    "figmaUnoCard0-9/green-3.svg",
    "figmaUnoCard0-9/green-4.svg",
    "figmaUnoCard0-9/green-5.svg",
    "figmaUnoCard0-9/green-6.svg",
    "figmaUnoCard0-9/green-7.svg",
    "figmaUnoCard0-9/green-8.svg",
    "figmaUnoCard0-9/green-9.svg",
    "figmaUnoCard0-9/greenStop.svg",
    "figmaUnoCard0-9/green-arrow.svg",

    "figmaUnoCard0-9/red-0.svg",
    "figmaUnoCard0-9/red-1.svg",
    "figmaUnoCard0-9/red-2.svg",
    "figmaUnoCard0-9/red2cards.svg",
    "figmaUnoCard0-9/red-3.svg",
    "figmaUnoCard0-9/red-4.svg",
    "figmaUnoCard0-9/red-5.svg",
    "figmaUnoCard0-9/red-6.svg",
    "figmaUnoCard0-9/red-7.svg",
    "figmaUnoCard0-9/red-8.svg",
    "figmaUnoCard0-9/red-9.svg",
    "figmaUnoCard0-9/redStop.svg",
    "figmaUnoCard0-9/red-arrow.svg",

    "figmaUnoCard0-9/yellow-0.svg",
    "figmaUnoCard0-9/yellow-1.svg",
    "figmaUnoCard0-9/yellow-2.svg",
    "figmaUnoCard0-9/yellow-3.svg",
    "figmaUnoCard0-9/yellow2cards.svg",
    "figmaUnoCard0-9/yellow-4.svg",
    "figmaUnoCard0-9/yellow-5.svg",
    "figmaUnoCard0-9/yellow-6.svg",
    "figmaUnoCard0-9/yellow-7.svg",
    "figmaUnoCard0-9/yellow-8.svg",
    "figmaUnoCard0-9/yellow-9.svg",
    "figmaUnoCard0-9/yellowStop.svg",
    "figmaUnoCard0-9/yellow-arrow.svg"
  ];

  getDeck(): string[] {
    return this.deck;
  }
}
