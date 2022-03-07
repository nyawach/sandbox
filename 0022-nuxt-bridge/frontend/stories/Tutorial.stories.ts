import { Story } from '@storybook/vue'
import Tutorial from '../components/Tutorial.vue'

export default {
  title: 'Tutorial',
  component: Tutorial,
}

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tutorial },
  template: `
   <Tutorial />
`
})

export const Default = Template.bind({})
