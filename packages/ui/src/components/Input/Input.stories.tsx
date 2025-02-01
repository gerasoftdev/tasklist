import type { Meta, StoryObj } from '@storybook/react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import type { ComponentProps } from 'react';
import { Input } from '@/components/Input';
import { size } from '@/theme';

type Args = ComponentProps<typeof Input> & {
  showLeftIcon: boolean;
  showRightIcon: boolean;
  showError: boolean;
  showLabel: boolean;
  showNote: boolean;
};

const meta: Meta<Args> = {
  title: 'Input',
  component: Input,
  argTypes: {
    $variant: {
      control: { type: 'radio' },
      options: ['outline', 'underline'],
    },
    $size: {
      control: { type: 'radio' },
      options: ['m', 'l'],
    },
    showRightIcon: {
      control: 'boolean',
      defaultValue: true,
    },
    showLeftIcon: {
      control: 'boolean',
      defaultValue: true,
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
    $variant: 'outline',
    $size: 'm',
    label: 'Label',
    note: 'Note',
    error: 'Error',
    placeholder: 'Placeholder',
    disabled: false,
    showLeftIcon: true,
    showRightIcon: true,
    showNote: true,
    showLabel: true,
    showError: false,
  },
  render: (args) => (
    <Input
      {...args}
      IconLeft={
        args.showLeftIcon ? (
          <IoAdd className="m-xs" size={size.xs} />
        ) : undefined
      }
      IconRight={
        args.showRightIcon ? (
          <IoRemove className="m-xs" size={size.xs} />
        ) : undefined
      }
      error={args.showError ? args.error : undefined}
      label={args.showLabel ? args.label : undefined}
      note={args.showNote ? args.note : undefined}
    />
  ),
};
