import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class CardAnimation {
  animateDrawCard(isPlayer: boolean, cardElement: any): void {
    const targetX = 200;
    const targetY = isPlayer ? 600 : -600;

    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power2.out" }
    });

    tl.to(cardElement.nativeElement, {
      x: targetX,
      y: targetY,
      scale: 0.5,
      opacity: 0,
      rotation: 360,
    });

    tl.set(cardElement.nativeElement, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotation: 0,
    });
  }
}
