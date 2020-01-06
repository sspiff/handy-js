
import fromPairsDeep from './fromPairsDeep'

describe('fromPairsDeep', () => {
  test('seems to work', () => {
    expect(fromPairsDeep(
      [
        ['/foo', 'foo'],
        ['/bar', 'bar'],
        ['/some/path/foo', 'somepathfoo'],
        ['/some/path/bar', 'somepathbar'],
        ['/ultimate/answer', 42]
      ], '/'))
      .toEqual({
        'foo': 'foo',
        'bar': 'bar',
        'some': {
          'path': {
            'foo': 'somepathfoo',
            'bar': 'somepathbar',
          },
        },
        'ultimate': {
          'answer': 42
        },
      })
  })
  test('default prefix accepts keys without leading sep', () => {
    expect(fromPairsDeep(
      [
        ['/foo', 'foo'],
        ['bar', 'bar'],
        ['/some/path/foo', 'somepathfoo'],
        ['some/path/bar', 'somepathbar'],
        ['/ultimate/answer', 42]
      ], '/'))
      .toEqual({
        'foo': 'foo',
        'bar': 'bar',
        'some': {
          'path': {
            'foo': 'somepathfoo',
            'bar': 'somepathbar',
          },
        },
        'ultimate': {
          'answer': 42
        },
      })
  })
  test('filters by and strips prefix', () => {
    expect(fromPairsDeep(
      [
        ['/foo', 'foo'],
        ['/bar', 'bar'],
        ['/some/path/foo', 'somepathfoo'],
        ['/some/path/bar', 'somepathbar'],
        ['/ultimate/answer', 42]
      ], '/', '/some/path/'))
      .toEqual({
        'foo': 'somepathfoo',
        'bar': 'somepathbar',
      })
  })
  test('filters by prefix and treats remaining leading sep as root', () => {
    expect(fromPairsDeep(
      [
        ['/foo', 'foo'],
        ['/bar', 'bar'],
        ['/some/path/foo', 'somepathfoo'],
        ['/some/path/bar', 'somepathbar'],
        ['/some/pathprefixed', 'somepathprefixed'],
        ['/ultimate/answer', 42]
      ], '/', '/some/path'))
      .toEqual({
        'foo': 'somepathfoo',
        'bar': 'somepathbar',
        'prefixed': 'somepathprefixed',
      })
  })
})

