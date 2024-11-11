import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuBar } from './MenuGlobal';

export default {
  title: 'Components/MenuBar',
  component: MenuBar,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as ComponentMeta<typeof MenuBar>;

const Template: ComponentStory<typeof MenuBar> = (args) => <MenuBar {...args} />;

export const Default = Template.bind({});
Default.args = {};