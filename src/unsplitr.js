
export default (s, sep, maxSplit) => (
  maxSplit >= s.length ? s :
    [...s.slice(0, maxSplit), s.slice(maxSplit).join(sep)]
)

