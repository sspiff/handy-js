
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

