import { TasksMain } from '@/routes/auth/features/TasksMain';
import { TasksSidebar } from '@/routes/auth/features/TasksSidebar';

export const MainScreen = () => {
  return (
    <>
      <TasksMain />
      <TasksSidebar />
    </>
  );
};
