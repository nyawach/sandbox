import { ref, shallowReadonly } from '@vue/composition-api'

export const useCounter = (defaultValue = 0) => {
    const count = ref(defaultValue)

    const increment = () => {
        count.value++
    }

    const decrement = () => {
        count.value--
    }

    return {
        count: shallowReadonly(count),
        increment,
        decrement,
    }
}
