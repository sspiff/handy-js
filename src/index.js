
/**
 * Handy bits of JavaScript:
 *
 * - {@link module:@sspiff/handy.fromPairsDeep fromPairsDeep()}
 *   constructs objects from key/value pairs.
 * - {@link module:@sspiff/handy.lruMemoize lruMemoize()}
 *   is a memoizer with a bounded cache size.
 * - {@link module:@sspiff/handy.perishable perishable()}
 *   caches a value with an expiration date.
 * - {@link module:@sspiff/handy.perishableRetryPromise perishablRetryPromise()}
 *   retries a rejected `perishable` promise with a backoff delay.
 * - {@link module:@sspiff/handy.pipe pipe()}
 *   composes functions by pipelining the output of one function to
 *   the input of another.
 * - {@link module:@sspiff/handy.unsplitl unsplitl()}
 *   undoes a portion of a string split,
 *   like Python's `string.rsplit()`'s `maxSplit`.
 * - {@link module:@sspiff/handy.unsplitr unsplitr()}
 *   undoes a portion of a string split,
 *   like Python's `string.split()`'s `maxSplit`.
 *
 * @module @sspiff/handy
 */

export {default as fromPairsDeep} from './fromPairsDeep'
export {default as lruMemoize} from './lruMemoize'
export {default as perishable} from './perishable'
export {default as perishableRetryPromise} from './perishableRetryPromise'
export {default as pipe} from './pipe'
export {default as unsplitl} from './unsplitl'
export {default as unsplitr} from './unsplitr'

