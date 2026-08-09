import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const OnLandingPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const OnGamePage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/weiss-schwarz']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};
