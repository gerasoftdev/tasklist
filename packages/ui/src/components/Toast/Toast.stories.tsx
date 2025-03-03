import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Toast } from '@/components/Toast';

type Args = ComponentProps<typeof Toast>;

const meta: Meta<Args> = {
  title: 'Toast',
  component: Toast,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['success', 'error', 'info', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    type: 'info',
    title: 'Title',
    onClick: () => undefined,
    onClose: () => undefined,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};
