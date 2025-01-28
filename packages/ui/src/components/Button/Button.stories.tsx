import type { Meta, StoryObj } from '@storybook/react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import type { ComponentProps } from 'react';
import { Button } from '@/components/Button';
import { size } from '@/theme';

type Args = ComponentProps<typeof Button> & {
  showLeftIcon: boolean;
  showRightIcon: boolean;
};

const meta: Meta<Args> = {
  title: 'Button',
  component: Button,
  argTypes: {
    $variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    $size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
    },
    showRightIcon: {
      control: 'boolean',
      defaultValue: true,
    },
    showLeftIcon: {
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
    $variant: 'primary',
    $size: 'l',
    label: 'Click me',
    showLeftIcon: true,
    showRightIcon: true,
  },
  render: (args) => (
    <Button
      {...args}
      IconLeft={args.showLeftIcon ? <IoAdd size={size.xs} /> : undefined}
      IconRight={args.showRightIcon ? <IoRemove size={size.xs} /> : undefined}
    />
  ),
};
