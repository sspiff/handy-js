
/**
 * Partially undoes a string split by joining a subset of the strings at
 * the beginning (the "left side") of an array resulting in an array with no
 * more than `maxSplit+1` items.  The result is intended to be similar
 * to the use of the `maxsplit` parameter to Python's `string.rsplit()`.
 *
 * @function unsplitl
 * @memberof module:@sspiff/handy
 * @param {string[]} s - Array of strings (typically from
 *   `String.prototype.split()`)
 * @param {string} sep - Separator to be used when joining
 * @param {number} maxSplit - Limits the length of the returned array
 *   to `maxSplit+1`
 * @returns {string[]}
 * @example
 *
 * import {unsplitl} from '@sspiff/handy'
 *
 * unsplitl('foo/bar/baz/quux'.split('/'), '/', 2)
 * // => ['foo/bar', 'baz', 'quux']
 */
export default (s, sep, maxSplit) => (
  maxSplit >= s.length ? s :
    maxSplit === 0 ? [s.join(sep)] :
    [s.slice(0, -maxSplit).join(sep), ...s.slice(-maxSplit)]
)

