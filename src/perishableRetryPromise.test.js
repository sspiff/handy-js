
import perishableRetryPromise from './perishableRetryPromise'

describe('perishableRetryPromise', () => {

  beforeEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  test('is a function', () => {
    expect(typeof perishableRetryPromise).toBe('function')
  })

  test('returns a function', () => {
    const r = p => Promise.resolve(true)
    expect(typeof perishableRetryPromise(0, 0, r)).toBe('function')
  })

  test('returns a function that returns a promise', () => {
    const r = p => Promise.resolve(true)
    expect(typeof perishableRetryPromise(0, 0, r)().then).toBe('function')
  })

  test('propagates resolution', async () => {
    const r = p => Promise.resolve('ETEST')
    const p = perishableRetryPromise(0, 0, r)
    await expect(p()).resolves.toBe('ETEST')
  })

  test('propagates reject reason', async () => {
    const r = p => Promise.reject('ETEST')
    const p = perishableRetryPromise(0, 0, r)
    await expect(p()).rejects.toBe('ETEST')
  })

  test('propagates exception', async () => {
    const r = p => new Promise(resolve => {
      throw 'ETEST'
    })
    const p = perishableRetryPromise(0, 0, r)
    await expect(p()).rejects.toBe('ETEST')
  })

  test('retries rejected promises with backoff', async () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const r = jest.fn(p => Promise.reject('ETEST'))
    const p = perishableRetryPromise(1, 10, r)
    var lastP = p()
    var expectedRefreshes = [1, 3, 7, 15, 25, 35, 45]
    while (tNow < 50) {
      await expect(lastP).rejects.toBe('ETEST')
      tNow += 1
      if (p() !== lastP) {
        expect(expectedRefreshes.shift()).toBe(tNow)
        lastP = p()
      }
    }
    expect(expectedRefreshes.length).toBe(0)
    expect(r.mock.calls.length).toBe(8)
  })

  test('restarts retry cycle with firstDelay after success', async () => {
    var tNow = 0
    var dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => tNow)
    const r = jest.fn(p => {
      if (r.mock.calls.length % 4 === 0) {
        p.expiresAt = tNow + 1
        return Promise.resolve('RESOLVED')
      }
      else
        return Promise.reject('REJECTED')
    })
    const p = perishableRetryPromise(1, 10, r)
    var lastP = p()
    // expected timeline:
    //  t   calls   result    delay  expiresAt
    //  0   1       REJECTED  1       1
    //  1   2       REJECTED  2       3
    //  3   3       REJECTED  4       7
    //  7   4       RESOLVED          8
    //  8   5       REJECTED  1       9
    //  9   6       REJECTED  2      11
    // 11   7       REJECTED  4      15
    // 15   8       RESOLVED         16
    var expectedResolved = [7, 15]
    var expectedRefreshes = [1, 3, 7, 8, 9, 11, 15]
    while (tNow < 15) {
      if (expectedResolved.includes(tNow))
        await expect(lastP).resolves.toBe('RESOLVED')
      else
        await expect(lastP).rejects.toBe('REJECTED')
      tNow += 1
      if (p() !== lastP) {
        expect(expectedRefreshes.shift()).toBe(tNow)
        lastP = p()
      }
    }
    expect(expectedRefreshes.length).toBe(0)
    expect(r.mock.calls.length).toBe(8)
  })

})

