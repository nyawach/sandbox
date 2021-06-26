import { Meta, Story } from '@storybook/vue'

import ABadge from '~/components/atoms/ABadge.vue'

const meta: Meta = {
  title: 'atoms/ABadge',
  component: ABadge,
}

export default meta

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ABadge },
  template: `
    <main>
      <ABadge
        :style-type="styleType"
        :text="text"
      />
      <template v-if="width">
        <p>with <code>width</code></p>
        <ABadge
          :style-type="styleType"
          :text="text"
          :width="width"
        />
      </template>
    </main>
  `,
})

export const Default = Template.bind({})

Default.args = {
  styleType: 'default',
  text: 'default',
  width: '150px',
}
