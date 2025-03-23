import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { TasksMain } from '@/routes/auth/features/TasksMain';
import { getTasksQuery } from '@/routes/auth/features/mockQueries';

type Args = ComponentProps<typeof TasksMain>;

const meta: Meta<Args> = {
  title: 'TasksMain',
  component: TasksMain,
  parameters: {
    apolloClient: {
      mocks: [getTasksQuery()],
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
