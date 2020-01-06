
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

