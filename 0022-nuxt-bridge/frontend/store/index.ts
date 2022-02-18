import { getAccessorType, mutationTree, actionTree, getterTree } from 'typed-vuex'
type State = {
    count: number
}

export const state = (): State => ({
    count: 0,
})

export const getters = getterTree(state, {
  currentCountText: (state: State) => `${state.count}回`,
})

export const mutations = mutationTree(state, {
  setCount(state, c: number) {
    state.count = c
  },
})

export const actions = actionTree(
  { state, mutations },
  {
      increment({ commit, state }) {
          commit('setCount', state.count + 1)
      },
      decrement({ commit, state }) {
          commit('setCount', state.count - 1)
      },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
