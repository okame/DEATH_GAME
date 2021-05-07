import { times } from 'lodash'
import { Score } from '../lib/scores'

type PlayerInformation = {
  num: number
  point: number
  life: number
}

type History = Score & {
  isOver?: boolean
}

export type OverResults = {
  playerInformations: PlayerInformation[]
  currentResults: History[]
  before: number
  round: number
  player: number
  history: History[][] // history[playerNum][round]で履歴蓄積
  currentTotalPoint: number
}

const FIRST_OVER = 40
const MAX_LIFE = 8
const defaultResults = {
  playerInformations: [],
  currentResults: [],
  before: FIRST_OVER,
  round: 0,
  player: 0,
  currentTotalPoint: 0,
  history: [],
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
      } as PlayerInformation)

      this.results.history.push([])
    })
  },

  // historyからplayerInformationsを計算
  calc(): void {
    this.results.playerInformations = []
    this.results.history.forEach((playerHistory: History[], i: number) => {
      const point = playerHistory.reduce((memo: number, history) => memo + history.point, 0)
      const life = playerHistory.reduce((memo: number, history) => memo - (history.isOver ? 1 : 0), 8)
      console.log(i, point)

      this.results.playerInformations.push({ num: i + 1, point, life })
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
    if (this.results.currentResults.length > 3) {
      return this.results
    }

    this.results.currentResults.push(score as History)
    this.results.history[this.results.player].push(score)

    if (this.results.currentResults.length === 3) {
      this.judgeWhetherOver()
      this.results.currentResults[this.results.currentResults.length - 1].isOver = true
      this.calc()
    }

    this.results.currentTotalPoint = this.currentTotalPoint()

    return this.results
  },

  playerChange(): OverResults {
    this.results.round++
    this.results.player = (this.results.player + 1) % this.playerNum
    this.results.before = this.currentTotalPoint()
    this.results.currentResults = []
    this.calc()

    return this.results
  },
}

export default over
