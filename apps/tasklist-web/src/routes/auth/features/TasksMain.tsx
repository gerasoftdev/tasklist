import { GhostButton, H2, Row, size } from '@repo/ui';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { IoMenu } from 'react-icons/io5';
import { Main } from '@/components/Main';
import { Tasks } from '@/routes/auth/features/Tasks';
import { NavigationBar } from '@/components/NavigationBar';
import { AddTaskPlusButton } from '@/routes/auth/features/AddTaskPlusButton';
import { useAppStore } from '@/hooks/useAppStore';

export const TasksMain: FC = () => {
  const { t } = useTranslation(['task']);
  const { setIsSidebarOpen } = useAppStore();

  return (
    <Main className="flex-1">
      <H2 className="px-lg py-md">{t('task:tasks')}</H2>
      <Tasks />
      <NavigationBar>
        <Row className="flex-1 items-center justify-between">
          <GhostButton
            $size={null}
            className="rounded-full p-md"
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          >
            <IoMenu className="text-g500" size={size.xs} />
          </GhostButton>
          <AddTaskPlusButton />
        </Row>
      </NavigationBar>
    </Main>
  );
};
