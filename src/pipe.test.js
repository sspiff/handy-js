
import pipe from './pipe'

describe('pipe', () => {

  test('composes functions', () => {
    let add = (a, b) => a + b
    let square = x => x * x
    let asString = x => x.toString()
    let p = pipe(add, square, asString)
    expect(p(1, 2)).toBe('9')
  })

})

