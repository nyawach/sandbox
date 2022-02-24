import { useCounter } from "~/assets/hooks/useCounter"

describe('useCounter.ts', () => {
    it('初期値を設定できる', () => {
        const v = 100
        const { count } = useCounter(v)
        expect(count.value).toBe(v)
    })
    it('incrementで1上がる', () => {
        
    })
})
