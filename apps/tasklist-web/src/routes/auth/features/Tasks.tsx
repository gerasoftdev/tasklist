import { Col } from '@repo/ui';
import type { FC } from 'react';
import { useMockTaskApi } from '@/hooks/mockTaskApi';
import { Task } from '@/routes/auth/features/Task';
import { AddTask } from '@/routes/auth/features/AddTask';

export const Tasks: FC = () => {
  const { tasks } = useMockTaskApi();

  return (
    <Col className="min-h-n px-sm flex-1 overflow-y-auto *:shrink-0">
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
      <AddTask />
    </Col>
  );
};
