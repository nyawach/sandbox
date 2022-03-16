import { Story } from '@storybook/vue'
import MyHeader from './Header.vue'

export default {
  title: 'Example/Header',
  component: MyHeader,
}

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyHeader },
  template:
    '<my-header :user="user" @onLogin="onLogin" @onLogout="onLogout" @onCreateAccount="onCreateAccount" />',
})

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {},
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
