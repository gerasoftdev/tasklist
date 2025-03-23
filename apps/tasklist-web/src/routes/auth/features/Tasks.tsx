import { Col, Spinner } from '@repo/ui';
import type { FC } from 'react';
import { Task } from '@/routes/auth/features/Task';
import { AddTask } from '@/routes/auth/features/AddTask';
import { useGetTasksQuery } from '@/hooks/apollo/api';

export const Tasks: FC = () => {
  const { data, loading } = useGetTasksQuery();
  const tasks = data?.getTasks.data || [];

  if (loading && !tasks.length) return <Spinner />;

  return (
    <Col className="min-h-n flex-1 overflow-y-auto px-sm *:shrink-0">
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
      <AddTask />
    </Col>
  );
};
