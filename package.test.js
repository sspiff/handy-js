
import * as handy from '.'

import unsplitr from './src/unsplitr'

describe('handy', () => {
  test('has unsplitr', () => {
    expect(handy.unsplitr).toBe(unsplitr)
  })
})

