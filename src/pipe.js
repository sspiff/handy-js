
/**
 * Creates a pipeline of functions with the output of one becoming
 * the input to the next.

 * @function pipe
 * @memberof module:@sspiff/handy
 * @param {function} f0 - First function, can accept any number of arguments.
 * @param {...function} fn - Subsequent functions, each should accept one
 *   argument.
 * @returns {function} A function accepting the same arguments as `f0` and
 *   evaluating to `fn(... f1(f0(...args)))`
 * @example
 *
 * import {pipe} from '@sspiff/handy'
 *
 * let add = (a, b) => a + b
 * let square = x => x * x
 * let asString = x => x.toString()
 * let p = pipe(add, square, asString)
 * p(1, 2) // => '9' === asString(square(add(1, 2)))
 */
export default (f0, ...fn) =>
  (...args) => fn.reduce((v, f) => f(v), f0(...args))

