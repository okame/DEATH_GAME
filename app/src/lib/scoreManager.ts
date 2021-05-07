import { Score, getScoreFromKeycode, Keycode } from './scores'

type ScoreManager = {
  handleDart: (handler: (score: Score) => void) => void
  handleChange: (handler: () => void) => void
  dartHandler?: (score: Score) => void
  changeHandler?: () => void
  observe: () => void
}

const scoreManager: ScoreManager = {
  handleDart(handler: (score: Score) => void): void {
    this.dartHandler = handler
  },

  handleChange(handler: () => void): void {
    this.changeHandler = handler
  },

  observe(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      const { key } = event

      if (key === 'Enter') {
        this.changeHandler && this.changeHandler()
      } else {
        const score = getScoreFromKeycode(key as Keycode)

        if (score && this.dartHandler) {
          this.dartHandler(score)
        }
      }
    })
  },
}

export default scoreManager
