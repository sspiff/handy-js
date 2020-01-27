
/**
 * Returns an object composed from key/value pairs where a separator
 * value in the keys allows the specification of a deep object structure.
 *
 * Each entry in the `pairs` array should be a two-item array whose first
 * element is a string (the key) and whose second element is the corresponding
 * value.  The key defines the location in the resulting object at which
 * the value appears.
 *
 * If a `prefix` is specified: keys that do not start with the prefix are
 * not added to the result object.  For matching keys, the prefix is trimmed
 * from the key and the pair is added to the result object.
 *
 * Keys (trimmed of any `prefix`) that start with `sep` are added to the
 * result object the same as if they did not start with `sep`.
 *
 * @function fromPairsDeep
 * @memberof module:@sspiff/handy
 * @param {Array.<Array>} pairs - Array of key/value pairs
 * @param {string} sep - Separator
 * @param {string} [prefix=''] - Key prefix to filter for
 * @returns {Object}
 * @example
 *
 * import {fromPairsDeep} from '@sspiff/handy'
 *
 * fromPairsDeep([
 *   ['/foo', 'foo'],
 *   ['bar', 'bar'],
 *   ['/some/path/foo', 'somepathfoo'],
 *   ['some/path/bar', 'somepathbar'],
 *   ['/ultimate/answer', 42]
 * ], '/')
 * // => {
 * //      'foo': 'foo',
 * //      'bar': 'bar',
 * //      'some': {
 * //        'path': {
 * //          'foo': 'somepathfoo',
 * //          'bar': 'somepathbar',
 * //        }
 * //      },
 * //      'ultimate': {
 * //        'answer': 42
 * //      }
 * //    }
 *
 * // with a prefix filter:
 * fromPairsDeep([
 *   ['/foo', 'foo'],
 *   ['bar', 'bar'],
 *   ['/some/path/foo', 'somepathfoo'],
 *   ['/some/path/bar', 'somepathbar'],
 *   ['/some/pathprefix', 'somepathprefix']
 * ], '/', '/some/path')
 * // => {
 * //      'foo': 'somepathfoo',
 * //      'bar': 'somepathbar',
 * //      'prefix': 'somepathprefix'
 * //    }
 */
export default (pairs, sep, prefix='') => (
  pairs.filter(([k, v]) => k.startsWith(prefix))
    .reduce((top, [k, v]) => (
      k.slice(prefix.length).split(sep).reduce((parent, c, i, a) => {
        if (i === 0 && c === '') {
          return parent
        } else if (i + 1 < a.length) {
          parent[c] = parent[c] || {}
          return parent[c]
        } else {
          parent[c] = v
          return top
        }
      }, top)
    ), {})
)

