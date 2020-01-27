
/**
 * Partially undoes a string split by joining a subset of the strings at
 * the end (the "right side") of an array resulting in an array with no
 * more than `maxSplit+1` items.  The result is intended to be similar
 * to the use of the `maxsplit` parameter to Python's `string.split()`.
 *
 * @function unsplitr
 * @memberof module:@sspiff/handy
 * @param {string[]} s - Array of strings (typically from
 *   `String.prototype.split()`)
 * @param {string} sep - Separator to be used when joining
 * @param {number} maxSplit - Limits the length of the returned array
 *   to `maxSplit+1`
 * @returns {string[]}
 * @example
 *
 * import {unsplitr} from '@sspiff/handy'
 *
 * unsplitr('foo/bar/baz/quux'.split('/'), '/', 2)
 * // => ['foo', 'bar', 'baz/quux']
 */
export default (s, sep, maxSplit) => (
  maxSplit >= s.length ? s :
    [...s.slice(0, maxSplit), s.slice(maxSplit).join(sep)]
)

