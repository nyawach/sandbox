import { Meta, ComponentStory } from '@storybook/react'
import AButton from '~/components/atoms/AButton'

const meta: Meta = {
  title: 'atoms/AButton',
  component: AButton,
  argTypes: {
    onClick: {
      actions: 'onClick',
    },
  },
}

export default meta

const Template: ComponentStory<typeof AButton> = (args) => (
  <AButton {...args}></AButton>
)

export const Default = Template.bind({})

Default.args = {
  text: 'テキスト',
}
