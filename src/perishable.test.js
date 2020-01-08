
import perishable from './perishable'

describe('perishable', () => {

  beforeEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  test('is a function', () => {
    expect(typeof perishable).toBe('function')
  })

  test('has symbol NEVER', () => {
    expect(typeof perishable.NEVER).toBe('symbol')
  })

  test('returns a function', () => {
    expect(typeof perishable((p) => true)).toBe('function')
  })

  test('lazily calls refresh the first time', () => {
    const f = jest.fn(p => 42)
    const p = perishable(f)
    expect(f.mock.calls.length).toBe(0)
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(1)
  })

  test('calls refresh on expiration', () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const f = jest.fn(p => {
      p.expiresAt = Date.now() + 1
      return 42
    })
    const p = perishable(f)
    expect(f.mock.calls.length).toBe(0)
    expect(dateNowSpy.mock.calls.length).toBe(0)
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(1)
    expect(dateNowSpy.mock.calls.length).toBe(1)
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(1)
    expect(dateNowSpy.mock.calls.length).toBe(2)
    tNow += 1
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(2)
    expect(dateNowSpy.mock.calls.length).toBe(4)
    tNow += 5
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(3)
    expect(dateNowSpy.mock.calls.length).toBe(6)
  })

  test('sets expiresAt to NEVER before each call to refresh', () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const f = jest.fn(p => {
      const e = p.expiresAt
      p.expiresAt = Date.now() + 1
      return e
    })
    const p = perishable(f)
    expect(p()).toBe(perishable.NEVER)
    tNow += 1
    expect(p()).toBe(perishable.NEVER)
    expect(f.mock.calls.length).toBe(2)
  })

  test('does not call refresh when expiresAt NEVER', () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const f = jest.fn(p => {
      return 42
    })
    const p = perishable(f)
    expect(p()).toBe(42)
    tNow += 1
    expect(p()).toBe(42)
    tNow += 100
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(1)
  })

  test('always refreshes when expiresAt undefined', () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const f = jest.fn(p => {
      p.expiresAt = undefined
      return 42
    })
    const p = perishable(f)
    expect(p()).toBe(42)
    expect(p()).toBe(42)
    tNow += 10
    expect(p()).toBe(42)
    expect(p()).toBe(42)
    expect(f.mock.calls.length).toBe(4)
  })

  test('always calls refresh with the same object', () => {
    const f = jest.fn(p => {
      p.expiresAt = undefined
      return p.count = p.count ? p.count + 1 : 1
    })
    const p = perishable(f)
    expect(p()).toBe(1)
    expect(p()).toBe(2)
    expect(p()).toBe(3)
  })

  test('honors async changes to expiresAt', async () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    jest.useFakeTimers()
    const f = jest.fn(p => {
      return new Promise(resolve =>
        setTimeout(() => {
          p.expiresAt = Date.now() + 1
          resolve(42)
        }, 1))
    })
    const p = perishable(f)
    const pp1 = p()
    expect(pp1 instanceof Promise).toBe(true)
    tNow += 1
    expect(p()).toBe(pp1)  // pending promise still expiresAt NEVER
    jest.runAllTimers()
    await expect(pp1).resolves.toBe(42)
    expect(f.mock.calls.length).toBe(1)
    expect(p()).toBe(pp1)  // resolved promise not expired yet
    tNow += 1
    const pp2 = p()        // refresh expired resolved promise
    expect(f.mock.calls.length).toBe(2)
    expect(pp2).not.toBe(pp1)
  })

})

