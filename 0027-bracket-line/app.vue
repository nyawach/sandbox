<template lang="pug">
.main
  .view
    template(v-for="cards in cardMatrix")
      .column
        template(v-for="card in cards")
          .card(
            @click="handleClickCard(card.id)"
            :data-selected="card.id === selectedCardId"
          )
            | {{ card.name }}
      svg(width="100" v-bind:height="viewboxHeight" xmlns="http://www.w3.org/2000/svg")
        g(fill="transparent" stroke="#eee" stroke-width="2")
          template(v-for="(_, i) in cards")
            template(v-if="i === cards.length - 1")
              //- 左→真ん中→上
              path(
                :d="`M0,${getY(i)} L50,${getY(i)} 50,${halfHeight}`"
              )
            template(v-else)
              //- 左→真ん中
              path(:d="`M0,${getY(i)} L50,${getY(i)}`")
          //- 真ん中→右
          path(:d="`M50,${halfHeight} L100,${halfHeight}`")
          //- 矢印
          path(:d="`M100,${halfHeight} L95,${halfHeight - 5}`")
          path(:d="`M100,${halfHeight} L95,${halfHeight + 5}`")
    section.detail
      template(v-if="selectedCard")
        h2 {{ selectedCard.name  }}
        dl
          dt id
          dd {{ selectedCard.id  }}
          dt name
          dd {{ selectedCard.name  }}
          dt from
          dd
            | {{ selectedCard.from  }}
          dt to
          dd
            | {{ selectedCard.to  }}
            select(@change="handleChangeTo")
              template(v-for="card in cards")
                option(:value="card.id") {{ card.name }}
</template>

<script lang="ts" setup>
type Card = {
  id: string
  name: string
  from: string[]
  to: string
}

const cards = ref<Card[]>([1,2,3,4,5].map(n => ({
  id: `card:${n}`,
  name: `Card${n}`,
  from: [],
  to: '',
})))

const cardMatrix: Card[][] = ([
  [
    {
      id: 'card:1',
      name: 'Card1',
      from: [],
      to: 'card:3',
    },
    {
      id: 'card:2',
      name: 'Card2',
      from: [],
      to: 'card:3',
    },
    {
      id: 'card:4',
      name: 'Card4',
      from: [],
      to: 'card:3',
    },
    {
      id: 'card:5',
      name: 'Card5',
      from: [],
      to: 'card:3',
    },
  ],
  [
    {
      id: 'card:3',
      name: 'Card3',
      from: [],
      to: 'card:3',
    },
  ],
])

const gap = 20
const cardHeight = 100
const halfHeight = cardHeight / 2
const getY = (i: number) => i * (cardHeight + gap) + halfHeight

const viewboxHeight = (() => {
  const maxLen = Math.max(...cardMatrix.map(m => m.length))
  return maxLen * cardHeight + Math.max(maxLen - 1, 0) * gap
})()

const selectedCardId = ref('')
const selectedCard = computed(() => cards.value.find(c => c.id === selectedCardId.value))

const handleClickCard = (cardId: string) => {
  selectedCardId.value = cardId
}

const handleChangeTo = (e: any) => {
  if (!selectedCard.value) return
  const to = e.target.value
  selectedCard.value.to = to
  const target = cards.value.find(c => c.id === to)
  if (!target) return
  if (!target.from.includes(to)) {
    target.from.push(to)
  }
}
</script>

<style lang="scss">
.view {
  display: grid;
  grid-auto-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.card {
  cursor: pointer;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  &[data-selected="true"] {
    border: 2px solid rgba(0, 125, 0, .3);
  }
 }

.column {
  display: grid;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
}
</style>
