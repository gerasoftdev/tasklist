import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Tasks } from '@/routes/auth/features/Tasks';
import { mockTask, mockTask2 } from '@/__fixtures__/task';
import { getTasksQuery } from '@/routes/auth/features/mockQueries';

type Args = ComponentProps<typeof Tasks>;

const meta: Meta<Args> = {
  title: 'Tasks',
  args: {
    tasks: [mockTask, mockTask2],
  },
  component: Tasks,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        getTasksQuery({
          result: {
            getTasks: { data: [mockTask, mockTask2], limit: 25, offset: 0 },
          },
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        getTasksQuery({
          loadingFor: Infinity,
        }),
      ],
    },
  },
};
