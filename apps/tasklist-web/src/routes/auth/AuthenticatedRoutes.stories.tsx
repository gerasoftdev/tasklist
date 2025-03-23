import type { Meta, StoryObj } from '@storybook/react';
import { AuthenticatedRoutes } from '@/routes/auth';
import { getTasksQuery } from '@/routes/auth/features/mockQueries';
import { mockTask, mockTask2 } from '@/__fixtures__/task';

const meta: Meta<typeof AuthenticatedRoutes> = {
  title: 'AuthenticatedRoutes',
  component: AuthenticatedRoutes,
};

export default meta;
type Story = StoryObj<typeof AuthenticatedRoutes>;

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
