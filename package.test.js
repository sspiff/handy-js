
import * as handy from '.'

import fromPairsDeep from './src/fromPairsDeep'
import lruMemoize from './src/lruMemoize'
import perishable from './src/perishable'
import pipe from './src/pipe'
import unsplitr from './src/unsplitr'

describe('handy', () => {
  test('has fromPairsDeep', () => {
    expect(handy.fromPairsDeep).toBe(fromPairsDeep)
  })
  test('has lruMemoize', () => {
    expect(handy.lruMemoize).toBe(lruMemoize)
  })
  test('has perishable', () => {
    expect(handy.perishable).toBe(perishable)
  })
  test('has pipe', () => {
    expect(handy.pipe).toBe(pipe)
  })
  test('has unsplitr', () => {
    expect(handy.unsplitr).toBe(unsplitr)
  })
})

