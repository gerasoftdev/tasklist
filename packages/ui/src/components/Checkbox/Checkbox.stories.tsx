import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Checkbox } from '@/components/Checkbox';

type Args = ComponentProps<typeof Checkbox> & {
  showLeftIcon: boolean;
  showRightIcon: boolean;
  showError: boolean;
  showLabel: boolean;
  showNote: boolean;
};

const meta: Meta<Args> = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    $size: {
      control: { type: 'radio' },
      options: ['m', 'l'],
    },
    showError: {
      control: 'boolean',
      defaultValue: true,
    },
    showLabel: {
      control: 'boolean',
      defaultValue: true,
    },
    showNote: {
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    $size: 'm',
    label: 'Label',
    note: 'Note',
    error: 'Error',
    disabled: false,
    showNote: true,
    showLabel: true,
    showError: false,
  },
  render: (args) => (
    <Checkbox
      {...args}
      error={args.showError ? args.error : undefined}
      label={args.showLabel ? args.label : undefined}
      note={args.showNote ? args.note : undefined}
    />
  ),
};
