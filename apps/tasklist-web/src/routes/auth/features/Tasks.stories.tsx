import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import type { Task } from '@repo/types';
import { Tasks } from '@/routes/auth/features/Tasks';
import { usePopulateTasks } from '@/utils/testUtils';
import { mockTask, mockTask2 } from '@/__fixtures__/task';

type Args = ComponentProps<typeof Tasks> & {
  tasks: Task[];
};

const meta: Meta<Args> = {
  title: 'Tasks',
  args: {
    tasks: [mockTask, mockTask2],
  },
  decorators: [
    (Story, { args }) => {
      usePopulateTasks(args.tasks);

      return <Story />;
    },
  ],
  component: Tasks,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
