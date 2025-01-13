import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { Text } from '@/components/typography/Text';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    children: <Text>Example button</Text>,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
