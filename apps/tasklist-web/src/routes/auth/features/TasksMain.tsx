import { H2 } from '@repo/ui';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { Main } from '@/components/Main';
import { Tasks } from '@/routes/auth/features/Tasks';
import { NavigationBar } from '@/components/NavigationBar';
import { AddTaskPlusButton } from '@/routes/auth/features/AddTaskPlusButton';

export const TasksMain: FC = () => {
  const { t } = useTranslation(['task']);

  return (
    <Main className="flex-1">
      <H2 className="px-lg py-md">{t('task:tasks')}</H2>
      <Tasks />
      <NavigationBar>
        <AddTaskPlusButton />
      </NavigationBar>
    </Main>
  );
};
