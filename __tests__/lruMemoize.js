
import lruMemoize from '../src/lruMemoize'

describe('lruMemoize', () => {

  test('is a function', () => {
    expect(typeof lruMemoize).toBe('function')
  })

  test('returns a function', () => {
    expect(typeof lruMemoize(2, i => i)).toBe('function')
  })

  test('can handle various function arguments', () => {
    const echo = jest.fn( (...args) => [...args] )
    const memoEcho = lruMemoize(3, echo)
    Array(3).fill().forEach(() => {
      expect(memoEcho()).toEqual([])
      expect(memoEcho(5)).toEqual([5])
      expect(memoEcho(5, 'foo', 'bar')).toEqual([5, 'foo', 'bar'])
    })
    expect(echo.mock.calls.length).toBe(3)
  })

  test('can store various types', () => {
    const types = [
      42,
      'foo',
      {'foo': 'bar'},
      () => true,
    ]
    const echo = jest.fn(i => i)
    const memoEcho = lruMemoize(types.length, echo)
    Array(3).fill().forEach(() => {
      types.forEach(t => {
        expect(memoEcho(t)).toBe(t)
      })
    })
    expect(echo.mock.calls.length).toBe(types.length)
  })

  test('evicts least-recently-used from cache', () => {
    const echo = jest.fn(i => i)
    const memoEcho = lruMemoize(2, echo)
    Array(3).fill().forEach(() => {
      expect(memoEcho(1)).toBe(1)  // C m m
      expect(memoEcho(2)).toBe(2)  // C m m
      expect(memoEcho(3)).toBe(3)  // C C C
      expect(memoEcho(3)).toBe(3)  // m m m
      expect(memoEcho(2)).toBe(2)  // m m m
      expect(memoEcho(1)).toBe(1)  // C C C
    })
    expect(memoEcho(4)).toBe(4) // evicts 2
    expect(memoEcho(1)).toBe(1)
    expect(memoEcho(2)).toBe(2)
    expect(echo.mock.calls.length).toBe(10);
    [1, 2, 3, 1, 3, 1, 3, 1, 4, 2].forEach((v, i) =>
      expect(echo.mock.calls[i][0]).toBe(v))
  })

})

