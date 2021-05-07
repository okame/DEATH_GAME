import { times } from 'lodash'

export const SCORE_TYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  TRIPLE: 'triple',
  BULL: 'bull',
} as const

export type ScoreType = typeof SCORE_TYPES[keyof typeof SCORE_TYPES]

const KEYCODES = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '0',
  '11': '!',
  '12': '@',
  '13': '#',
  '14': '$',
  '15': '%',
  '16': '^',
  '17': '&',
  '18': '*',
  '19': '(',
  '20': ')',
  'DOUBLE 1': 'q',
  'DOUBLE 2': 'w',
  'DOUBLE 3': 'e',
  'DOUBLE 4': 'r',
  'DOUBLE 5': 't',
  'DOUBLE 6': 'y',
  'DOUBLE 7': 'u',
  'DOUBLE 8': 'i',
  'DOUBLE 9': 'o',
  'DOUBLE 10': 'p',
  'DOUBLE 11': 'Q',
  'DOUBLE 12': 'W',
  'DOUBLE 13': 'E',
  'DOUBLE 14': 'R',
  'DOUBLE 15': 'T',
  'DOUBLE 16': 'Y',
  'DOUBLE 17': 'U',
  'DOUBLE 18': 'I',
  'DOUBLE 19': 'O',
  'DOUBLE 20': 'P',
  'TRIPLE 1': 'a',
  'TRIPLE 2': 's',
  'TRIPLE 3': 'd',
  'TRIPLE 4': 'f',
  'TRIPLE 5': 'g',
  'TRIPLE 6': 'h',
  'TRIPLE 7': 'j',
  'TRIPLE 8': 'k',
  'TRIPLE 9': 'l',
  'TRIPLE 10': ';',
  'TRIPLE 11': 'A',
  'TRIPLE 12': 'S',
  'TRIPLE 13': 'D',
  'TRIPLE 14': 'F',
  'TRIPLE 15': 'G',
  'TRIPLE 16': 'H',
  'TRIPLE 17': 'J',
  'TRIPLE 18': 'K',
  'TRIPLE 19': 'L',
  'TRIPLE 20': ':',
  BULL: 'z',
  'IN BULL': 'x',
} as const

export type Keycode = typeof KEYCODES[keyof typeof KEYCODES]

export type Score = {
  point: number
  label: keyof typeof KEYCODES
  type: ScoreType
  keycode: Keycode
}
const scores: Score[] = []

times(20, (i: number) => {
  const index = i + 1
  let label = index.toString() as keyof typeof KEYCODES

  scores.push({
    point: index,
    label,
    type: SCORE_TYPES.SINGLE,
    keycode: KEYCODES[label],
  })

  label = `DOUBLE ${index.toString()}` as keyof typeof KEYCODES
  scores.push({
    point: index * 2,
    label,
    type: SCORE_TYPES.DOUBLE,
    keycode: KEYCODES[label],
  })

  label = `TRIPLE ${index.toString()}` as keyof typeof KEYCODES
  scores.push({
    point: index * 3,
    label,
    type: SCORE_TYPES.TRIPLE,
    keycode: KEYCODES[label],
  })
})

scores.push({
  point: 50,
  label: 'BULL',
  type: SCORE_TYPES.BULL,
  keycode: KEYCODES.BULL,
})

scores.push({
  point: 50,
  label: 'IN BULL',
  type: SCORE_TYPES.BULL,
  keycode: KEYCODES['IN BULL'],
})

export function getScoreFromKeycode(keycode: Keycode): Score | undefined {
  return scores.find((score) => score.keycode === keycode)
}

export default scores
