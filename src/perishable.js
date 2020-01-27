
/**
 * Creates a function that returns a cached value that is refreshed when
 * it expires.  The given function `refresh` is called and its return value
 * is cached until expiration, at which point `refresh` is called again.
 *
 * `refresh` is passed a single `Object` parameter `p`. When `refresh` is
 * called, `p.value` will contain the previously cached value (if any) and
 * `p.expiresAt` will have the value `perishable.NEVER`.  `refresh` should
 * return the new value to cache (`refresh` should not set `p.value`), and
 * it can set `p.expiresAt`, if known.  Alternatively, `p.expiresAt` can be
 * set asynchronously, for example during the resolution of a promise.
 *
 * The expiration date `p.expiresAt` must be expressed as the number of
 * milliseconds since the epoch.  It will be compared with `Date.now()`
 * to determine whether or not the currently cached value has expired.
 * Alternatively, `p.expiresAt` can be set to `perishable.NEVER` to indicate
 * that the cached value never expires, or set to `undefined` to indicate
 * a single-use value (effectively no caching).
 *
 * `refresh` will not be called until a value is required, and the same
 * `p` object will be passed on every call to `refresh`.
 *
 * @function perishable
 * @memberof module:@sspiff/handy
 * @param {function} refresh - Function that provides the new value to cache
 * @returns {function} A function that takes no arguments and returns the
 *   cached value, refreshing if needed.
 * @example
 *
 * const sleep = ms => new Promise(resolve => setTimetout(resolve, ms))
 *
 * import {perishable} from '@sspiff/handy'
 *
 * let x = perishable(p => new Promise(() => {
 *   p.expiresAt = Date.now() + 1000
 *   return (p.value || 0) + 1
 * }))
 *
 * await x()           // => 1 (initial value)
 * await sleep(500)
 * await x()           // => 1 (not expired yet)
 * await sleep(5000)
 * await x()           // => 2 (initial value expired)
 */
function perishable(refresh) {
  const p = {}
  return function () {
    if (p.expiresAt === undefined ||
        (p.expiresAt !== perishable.NEVER && Date.now() >= p.expiresAt)) {
      p.expiresAt = perishable.NEVER
      p.value = refresh(p)
    }
    return p.value
  }
}
perishable.NEVER = Symbol('handy.perishable.NEVER')

export default perishable

