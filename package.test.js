
import * as handy from '.'

import fromPairsDeep from './src/fromPairsDeep'
import lruMemoize from './src/lruMemoize'
import perishable from './src/perishable'
import perishableRetryPromise from './src/perishableRetryPromise'
import pipe from './src/pipe'
import unsplitl from './src/unsplitl'
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
  test('has perishableRetryPromise', () => {
    expect(handy.perishableRetryPromise).toBe(perishableRetryPromise)
  })
  test('has pipe', () => {
    expect(handy.pipe).toBe(pipe)
  })
  test('has unsplitl', () => {
    expect(handy.unsplitl).toBe(unsplitl)
  })
  test('has unsplitr', () => {
    expect(handy.unsplitr).toBe(unsplitr)
  })
})

