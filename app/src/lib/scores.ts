import { times } from 'lodash'

export const SCORE_TYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  TRIPLE: 'triple',
  BULL: 'bull',
} as const

export type ScoreType = typeof SCORE_TYPES[keyof typeof SCORE_TYPES]

const KEYCODES = {
  '1': '!Y',
  '2': '>N',
  '3': 'rA',
  '4': 's<',
  '5': '-/',
  '6': 'i=',
  '7': 'EJ',
  '8': 'jX',
  '9': 'me',
  '10': '.p',
  '11': '&G',
  '12': 'W+',
  '13': 'Tc',
  '14': 'UL',
  '15': '%k',
  '16': 'af',
  '17': 'I_',
  '18': 'S2',
  '19': 'nF',
  '20': 'P^',
  'DOUBLE 1': '4',
  'DOUBLE 2': '0',
  'DOUBLE 3': '"',
  'DOUBLE 4': '(',
  'DOUBLE 5': 'o',
  'DOUBLE 6': 'Q',
  'DOUBLE 7': 'D',
  'DOUBLE 8': ']',
  'DOUBLE 9': 'C',
  'DOUBLE 10': 't',
  'DOUBLE 11': 'M',
  'DOUBLE 12': '?',
  'DOUBLE 13': 'l',
  'DOUBLE 14': '\\',
  'DOUBLE 15': 'h',
  'DOUBLE 16': 'Z',
  'DOUBLE 17': '*',
  'DOUBLE 18': 'R',
  'DOUBLE 19': '3',
  'DOUBLE 20': 'H',
  'TRIPLE 1': 'V',
  'TRIPLE 2': '[',
  'TRIPLE 3': 'O',
  'TRIPLE 4': 'g',
  'TRIPLE 5': 'B',
  'TRIPLE 6': '6',
  'TRIPLE 7': 'K',
  'TRIPLE 8': 'd',
  'TRIPLE 9': '#',
  'TRIPLE 10': 'b',
  'TRIPLE 11': '$',
  'TRIPLE 12': ':',
  'TRIPLE 13': '5',
  'TRIPLE 14': '7',
  'TRIPLE 15': '8',
  'TRIPLE 16': ',',
  'TRIPLE 17': 'q',
  'TRIPLE 18': ';',
  'TRIPLE 19': "'",
  'TRIPLE 20': '@',
  BULL: '1',
  'IN BULL': '9',
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
  return scores.find((score) => score.keycode.includes(keycode))
}

export default scores
