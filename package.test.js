
import * as handy from '.'

import fromPairsDeep from './src/fromPairsDeep'
import lruMemoize from './src/lruMemoize'
import unsplitr from './src/unsplitr'

describe('handy', () => {
  test('has fromPairsDeep', () => {
    expect(handy.fromPairsDeep).toBe(fromPairsDeep)
  })
  test('has lruMemoize', () => {
    expect(handy.lruMemoize).toBe(lruMemoize)
  })
  test('has unsplitr', () => {
    expect(handy.unsplitr).toBe(unsplitr)
  })
})

