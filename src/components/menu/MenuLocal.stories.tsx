import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuBarLocal } from './MenuLocal';

export default {
  title: 'Components/MenuBarLocal',
  component: MenuBarLocal,
} as ComponentMeta<typeof MenuBarLocal>;

const Template: ComponentStory<typeof MenuBarLocal> = (args) => <MenuBarLocal {...args} />;

export const Default = Template.bind({});
Default.args = {
  menuOptions: [
    {
      onPress: () => alert('Clicked on Option 1'),
      backgroundColor: '#ff0000',
      text: 'Option 1',
    },
    {
      onPress: () => alert('Clicked on Option 2'),
      backgroundColor: '#00ff00',
      text: 'Option 2',
    },
    {
      onPress: () => alert('Clicked on Option 3'),
      backgroundColor: '#0000ff',
      text: 'Option 3',
    },
  ],
};