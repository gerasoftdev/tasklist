import type { Meta, StoryObj } from '@storybook/react';
import { AuthenticatedRoutes } from '@/routes/auth';

const meta: Meta<typeof AuthenticatedRoutes> = {
  title: 'AuthenticatedRoutes',
  component: AuthenticatedRoutes,
};

export default meta;
type Story = StoryObj<typeof AuthenticatedRoutes>;

export const Default: Story = {};
