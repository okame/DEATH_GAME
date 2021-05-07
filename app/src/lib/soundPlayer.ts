import { Howl } from 'howler'

export class SoundPlayer {
  sound: Howl

  constructor(src: string) {
    this.sound = new Howl({ src })
  }

  play(): void {
    this.sound.play()
  }
}
