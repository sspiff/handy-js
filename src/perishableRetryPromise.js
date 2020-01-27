
import perishable from './perishable'

/**
 * Wraps {@link module:@sspiff/handy.perishable perishable} to provide
 * retries with a backoff delay for rejected promises.  This is useful
 * if the promise can be rejected due to e.g. transient network errors.
 * Additionally, a resolved promise from `refresh` will be rejected
 * (with `'ESTALE'`) if it is already expired.
 *
 * If the promise is rejected, the perishable is set to expire after a
 * delay.  That is, the perishable will continue to yield the rejected
 * promise until the retry delay has passed and `refresh` is called again.
 *
 * `firstDelay` is used as the first retry delay.  A backoff scheme is
 * implemented by doubling the delay for each subsequent consecutive
 * rejected promise, up to a maximum delay of `maxDelay`.  Once the promise
 * resolves successfully, a future rejection will start retrying with
 * `firstDelay`.
 *
 * The last retry delay used is stored in the perishable object as
 * `p.retryDelay`.
 *
 * @function perishableRetryPromise
 * @memberof module:@sspiff/handy
 * @param {number} firstDelay - Milliseconds to wait for retry after first
 *   consecutive rejection; subsequent consecutive rejections will wait
 *   for double the previous delay
 * @param {number} maxDelay - Maximium milliseconds to delay before retrying
 * @param {function} refresh -
 *   See {@link module:@sspiff/handy.perishable perishable};
 *   must return a promise
 * @returns {function} See {@link module:@sspiff/handy.perishable perishable}
 */
export default (firstDelay, maxDelay, refresh) =>
  perishable(p =>
    refresh(p)
      .then(v => {
        if (p.expiresAt !== perishable.NEVER && Date.now() >= p.expiresAt)
          throw 'ESTALE'
        p.retryDelay = 0
        return v
      })
      .catch(err => {
                       // if retryDelay is undefined, Math.min() will
                       // yield NaN, which is falsy, resulting in a
                       // retryDelay of firstDelay:
        p.retryDelay = Math.min(p.retryDelay * 2, maxDelay) || firstDelay
        p.expiresAt = Date.now() + p.retryDelay
        throw err
      })
  )

