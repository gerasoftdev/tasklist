import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { OverlaySpinner } from '@/components/OverlaySpinner';

type Args = ComponentProps<typeof OverlaySpinner>;

const meta: Meta<Args> = {
  title: 'OverlaySpinner',
  component: OverlaySpinner,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
