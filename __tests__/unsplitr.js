
import unsplitr from '../src/unsplitr'

describe('unsplitr', () => {
  test('joins all items', () => {
    expect(unsplitr('foo;bar;baz;quux'.split(';'), ';', 0))
      .toEqual(['foo;bar;baz;quux'])
  })
  test('joins all but the first n items', () => {
    expect(unsplitr('foo;bar;baz;quux'.split(';'), ';', 1))
      .toEqual(['foo', 'bar;baz;quux'])
    expect(unsplitr('foo;bar;baz;quux'.split(';'), ';', 2))
      .toEqual(['foo', 'bar', 'baz;quux'])
  })
  test('joins no items', () => {
    expect(unsplitr('foo;bar;baz;quux'.split(';'), ';', 3))
      .toEqual(['foo', 'bar', 'baz', 'quux'])
    expect(unsplitr('foo;bar;baz;quux'.split(';'), ';', 4))
      .toEqual(['foo', 'bar', 'baz', 'quux'])
  })
  test('preserves empty values when joining', () => {
    expect(unsplitr('foo;bar;;quux;'.split(';'), ';', 2))
      .toEqual(['foo', 'bar', ';quux;'])
  })
  test('handles empty input array', () => {
    expect(unsplitr([], ';', 1))
      .toEqual([])
  })
})

