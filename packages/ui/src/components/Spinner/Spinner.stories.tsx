import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Spinner } from '@/components/Spinner';

type Args = ComponentProps<typeof Spinner>;

const meta: Meta<Args> = {
  title: 'Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
