import { useCounter } from "~/assets/hooks/useCounter"

describe('useCounter.ts', () => {
    it('初期値を設定できる', () => {
        const v = 100
        const { count } = useCounter(v)
        expect(count.value).toBe(v)
    })
    describe('increment', () => {
        it('incrementで1上がる', () => {
            const { count, increment } = useCounter()
            increment()
            expect(count.value).toBe(1)
        })
        it('incrementで初期値+1上がる', () => {
            const v = 100
            const { count, increment } = useCounter(v)
            increment()
            expect(count.value).toBe(v + 1)
        })
    })
    describe('decrement', () => {
        it('decrementで1下がる', () => {
            const { count, decrement } = useCounter()
            decrement()
            expect(count.value).toBe(-1)
        })
        it('decrementで初期値+1下がる', () => {
            const v = 100
            const { count, decrement } = useCounter(v)
            decrement()
            expect(count.value).toBe(v - 1)
        })
    })
})
