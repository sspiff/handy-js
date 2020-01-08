
export default (f0, ...fn) =>
  (...args) => fn.reduce((v, f) => f(v), f0(...args))

