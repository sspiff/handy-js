
import * as handy from '..'

import fromPairsDeep from './fromPairsDeep'
import lruMemoize from './lruMemoize'
import perishable from './perishable'
import perishableRetryPromise from './perishableRetryPromise'
import pipe from './pipe'
import unsplitl from './unsplitl'
import unsplitr from './unsplitr'

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

