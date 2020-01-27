
import memoize from 'fast-memoize'


// LRU cache for fast-memoize
//
const lruCache = maxCount => {
  var count = 0
  const cache = Object.create(null)
  const mru = {}
  const lru = {}
  mru.next = lru
  lru.prev = mru
  const rem = i => {
    i.next.prev = i.prev
    i.prev.next = i.next
    return i
  }
  const push = i => {
    i.next = mru.next
    i.next.prev = i
    i.prev = mru
    mru.next = i
    return i
  }
  const lookup = key => {
    const i = cache[key]
    return i ? push(rem(i)) : undefined
  }
  return {
    get: key => {
      const i = lookup(key)
      return i ? i.value : undefined
    },
    set: (key, value) => {
      var i = lookup(key)
      if (!i) {
        i = {key, value}
        cache[key] = i
        push(i)
        if (count == maxCount)
          delete cache[rem(lru.prev).key]
        else
          count += 1
      }
      else {
        i.value = value
      }
    }
  }
}

/**
 * Returns a memoized function with a given cache entry count limit.
 * When the count limit is reached, existing entries are replaced
 * least-recently-used first.
 *
 * Uses `fast-memoize` under the hood.  Callers can provide `fast-memoize`
 * options (other than a cache) via the optional `options` parameter.
 *
 * @function lruMemoize
 * @memberof module:@sspiff/handy
 * @param {number} maxCount - Maximum number of cache entries
 * @param {function} f - Function to memoize
 * @param {Object} [options={}] - Additional options for `fast-memoize`
 * @returns {function}
 * @example
 *
 * import {lruMemoize} from '@sspiff/handy'
 *
 * f = lruMemoize(10, x => x)
 * f('hello')  // => 'hello'
 */
export default (maxCount, f, options={}) => memoize(f, {
  ...options,
  cache: {create: () => lruCache(maxCount)}
})

