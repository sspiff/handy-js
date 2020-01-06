
import * as handy from '.'

import fromPairsDeep from './src/fromPairsDeep'
import unsplitr from './src/unsplitr'

describe('handy', () => {
  test('has fromPairsDeep', () => {
    expect(handy.fromPairsDeep).toBe(fromPairsDeep)
  })
  test('has unsplitr', () => {
    expect(handy.unsplitr).toBe(unsplitr)
  })
})

