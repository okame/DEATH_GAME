import { times, maxBy } from 'lodash'
import { Score } from '../lib/scores'

type PlayerInformation = {
  num: number
  point: number
  life: number
  over: boolean
}

type History = Score & {
  isOver?: boolean
}

type PlayerHistory = {
  scores: Score[]
  isOver: boolean
  point: number
}

export type OverResults = {
  playerInformations: PlayerInformation[]
  currentResults: History[]
  before: number
  round: number
  player: number
  history: PlayerHistory[][] // history[playerNum][round]で履歴蓄積
  currentTotalPoint: number
  end: boolean
  winner?: number
}

const FIRST_OVER = 40
const MAX_LIFE = 8
const MAX_ROUND = 4
const defaultResults = {
  playerInformations: [],
  currentResults: [],
  before: FIRST_OVER,
  round: 0,
  player: 0,
  currentTotalPoint: 0,
  history: [],
  end: false,
} as OverResults

const over = {
  results: defaultResults,
  playerNum: 4,

  init(playerNum: number): void {
    this.playerNum = playerNum

    times(playerNum, (i: number) => {
      this.results.playerInformations.push({
        num: i + 1,
        point: 0,
        life: MAX_LIFE,
        over: false,
      } as PlayerInformation)

      this.results.history.push([])
    })
  },

  // historyからplayerInformationsを計算
  calc(): void {
    this.results.playerInformations = []
    this.results.history.forEach((playerHistories: PlayerHistory[], i: number) => {
      const point = playerHistories.reduce((memo: number, history) => {
        return memo + (history.isOver ? 0 : history.point)
      }, 0)
      const life = playerHistories.reduce((memo: number, history) => memo - (history.isOver ? 1 : 0), 8)
      const over = life === 0

      this.results.playerInformations.push({ num: i + 1, point, life, over })
    })
  },

  currentTotalPoint(): number {
    return this.results.currentResults.reduce((memo: number, score: Score) => memo + score.point, 0)
  },

  judgeWhetherOver(): boolean {
    const totalPoint = this.currentTotalPoint()

    return totalPoint <= this.results.before
  },

  dart(score: Score): OverResults {
    if (this.results.currentResults.length >= 3) {
      return this.results
    }

    this.results.currentResults.push(score)
    this.results.currentTotalPoint = this.currentTotalPoint()

    return this.results
  },

  overPlayerNum(): number {
    return this.results.playerInformations.reduce((memo: number, info: PlayerInformation) => {
      return memo + (info.over ? 1 : 0)
    }, 0)
  },

  endGame(): void {
    this.results.end = true
    const winner = maxBy(this.results.playerInformations, (info: PlayerInformation) => {
      return info.over ? -1 : info.point
    })

    this.results.winner = winner?.num
  },

  playerChange(): OverResults {
    this.results.history[this.results.player].push({
      scores: { ...this.results.currentResults },
      point: this.currentTotalPoint(),
      isOver: this.judgeWhetherOver(),
    })
    this.results.before = this.currentTotalPoint()
    this.results.currentResults = []
    this.results.currentTotalPoint = 0
    this.calc()

    if (this.overPlayerNum() === 1) {
      this.endGame()

      return this.results
    }

    if (this.results.player === this.playerNum - 1) {
      if (this.results.round === MAX_ROUND) {
        this.endGame()

        return this.results
      }

      this.results.round++
    }

    this.results.player = (this.results.player + 1) % this.playerNum

    while (this.results.playerInformations[this.results.player].over) {
      this.results.player = (this.results.player + 1) % this.playerNum
    }

    return this.results
  },
}

export default over
