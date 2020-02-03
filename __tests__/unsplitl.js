
import unsplitl from '../src/unsplitl'

describe('unsplitl', () => {
  test('joins all items', () => {
    expect(unsplitl('foo;bar;baz;quux'.split(';'), ';', 0))
      .toEqual(['foo;bar;baz;quux'])
  })
  test('joins all but the last n items', () => {
    expect(unsplitl('foo;bar;baz;quux'.split(';'), ';', 1))
      .toEqual(['foo;bar;baz', 'quux'])
    expect(unsplitl('foo;bar;baz;quux'.split(';'), ';', 2))
      .toEqual(['foo;bar', 'baz', 'quux'])
  })
  test('joins no items', () => {
    expect(unsplitl('foo;bar;baz;quux'.split(';'), ';', 3))
      .toEqual(['foo', 'bar', 'baz', 'quux'])
    expect(unsplitl('foo;bar;baz;quux'.split(';'), ';', 4))
      .toEqual(['foo', 'bar', 'baz', 'quux'])
  })
  test('preserves empty values when joining', () => {
    expect(unsplitl(';foo;bar;;quux;'.split(';'), ';', 2))
      .toEqual([';foo;bar;', 'quux', ''])
  })
  test('handles empty input array', () => {
    expect(unsplitl([], ';', 1))
      .toEqual([])
  })
})

