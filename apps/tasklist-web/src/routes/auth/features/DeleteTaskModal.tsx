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
import type { GetTaskQuery } from '@repo/graphql';
import { GetTasks } from '@repo/graphql';
import { useDeleteTaskMutation } from '@/hooks/apollo/api';

type Props = {
  task: Exclude<GetTaskQuery['getTaskById'], null>;
  onSubmit: () => void;
  onCancel: () => void;
};

export const DeleteTaskModal: FC<Props> = ({ task, onSubmit, onCancel }) => {
  const { t } = useTranslation(['task', 'common']);
  const [deleteTaskMutation, { loading: deleting }] = useDeleteTaskMutation({
    refetchQueries: [GetTasks],
  });

  const isLoading = deleting;

  const handleCancelDelete = () => {
    onCancel();
  };
  const handleConfirmDelete = () => {
    deleteTaskMutation({
      variables: { data: { _id: task._id } },
    }).then(() => {
      onSubmit();
    });
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
        <GhostButton disabled={isLoading} onClick={handleConfirmDelete}>
          <BodyRegular $bold className="text-red">
            {t('common:delete')}
          </BodyRegular>
        </GhostButton>
      </Row>
    </Modal>
  );
};
