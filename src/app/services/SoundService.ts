import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private currentAudio?: HTMLAudioElement;

  playSound(src: string): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);
    this.currentAudio.load();
    this.currentAudio.play().catch(err => {
      console.warn('Audio konnte nicht abgespielt werden: + ', err);
    });
  }
}

