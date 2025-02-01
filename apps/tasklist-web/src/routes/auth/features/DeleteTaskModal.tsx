import {
  BodyRegular,
  BodySmall,
  GhostButton,
  Modal,
  Row,
  SecondaryButton,
} from '@repo/ui';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Task } from '@repo/types';
import { useMockTaskApi } from '@/hooks/mockTaskApi';

type Props = {
  task: Task;
  onSubmit: () => void;
  onCancel: () => void;
};

export const DeleteTaskModal: FC<Props> = ({ task, onSubmit, onCancel }) => {
  const { t } = useTranslation(['task', 'common']);
  const { deleteTask } = useMockTaskApi();

  const handleCancelDelete = () => {
    onCancel();
  };
  const handleConfirmDelete = () => {
    deleteTask(task._id);
    onSubmit();
  };

  return (
    <Modal
      className="w-xxl"
      onClose={handleCancelDelete}
      title={t('task:deleteTask')}
    >
      <BodySmall $bold>
        {t('task:deleteTaskDescription', { taskName: task.name })}
      </BodySmall>
      <Row className="justify-end gap-md">
        <SecondaryButton
          label={t('common:cancel')}
          onClick={handleCancelDelete}
        />
        <GhostButton onClick={handleConfirmDelete}>
          <BodyRegular $bold className="text-red">
            {t('common:delete')}
          </BodyRegular>
        </GhostButton>
      </Row>
    </Modal>
  );
};
