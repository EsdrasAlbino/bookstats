import { ComponentStory, ComponentMeta } from "@storybook/react";
import Cards from './Cards';

export default {
  title: 'Components/Cards',
  component: Cards,
} 

const Template: ComponentStory<typeof Cards> = (args) => <Cards {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    rating: 4.5,
  },
};

export const NoAuthor = Template.bind({});
NoAuthor.args = {
  book: {
    id: '2',
    title: '1984',
    author: '',
    genre: 'Dystopian',
    rating: 4,
  },
};

export const NoGenre = Template.bind({});
NoGenre.args = {
  book: {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: '',
    rating: 5,
  },
};

export const NoRating = Template.bind({});
NoRating.args = {
  book: {
    id: '4',
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    rating: 0,
  },
};