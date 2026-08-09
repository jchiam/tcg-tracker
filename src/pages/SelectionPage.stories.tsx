import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { SelectionPage } from './SelectionPage';

const meta: Meta<typeof SelectionPage> = {
  title: 'Pages/SelectionPage',
  component: SelectionPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SelectionPage>;

export const Default: Story = {};
