import { createLocalVue } from '@vue/test-utils'
import CompositionApi, { ref, shallowReadonly } from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(CompositionApi)

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
