import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class CardAnimation {
  animateDrawCard(witchPlayer: boolean, backCard: any): void {
    if (witchPlayer){
      gsap.to(backCard.nativeElement, {
        x: 200,
        y: 600,
        scale: 0.5,
        opacity: 0,
        rotation: 360,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(backCard.nativeElement, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
          });
        }
      });
    } else {
      gsap.to(backCard.nativeElement, {
        x: 200,
        y: -600,
        scale: 0.5,
        rotation: 360,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(backCard.nativeElement, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
          });
        }
      });
    }

  }

}
