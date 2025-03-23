import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object } from 'zod';
import type { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Modal,
  PrimaryButton,
  Row,
  SecondaryButton,
  BodyRegular,
  Input,
  GhostButton,
  Spinner,
} from '@repo/ui';
import { Redirect, useLocation, useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { taskSchemaFields } from '@repo/validation-schema';
import type { GetTaskQuery } from '@repo/graphql';
import { ROUTES } from '@/constants/routes';
import { DeleteTaskModal } from '@/routes/auth/features/DeleteTaskModal';
import { useGetTaskQuery, useUpdateTaskMutation } from '@/hooks/apollo/api';

const formSchema = object({
  name: taskSchemaFields.name,
});

type FormData = TypeOf<typeof formSchema>;

type EditTaskContentProps = {
  onSubmit: () => void;
  onCancel: () => void;
  task: Exclude<GetTaskQuery['getTaskById'], null>;
};

export const EditTaskModal: FC<EditTaskContentProps> = ({
  onSubmit,
  onCancel,
  task,
}) => {
  const { t } = useTranslation(['common', 'task']);
  const [_, setLocation] = useLocation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [updateTaskMutation, { loading: updating }] = useUpdateTaskMutation();
  const isLoading = updating;

  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task.name,
    },
    mode: 'onTouched',
  });

  const handleSubmit = (data: FormData) => {
    updateTaskMutation({
      variables: {
        data: {
          _id: task._id,
          ...data,
        },
      },
    }).then(() => {
      onSubmit();
    });
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setLocation(ROUTES.TASKS());
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <Modal className="w-xxl" onClose={onCancel} title={t('task:editTask')}>
      <form
        className="min-h-n min-w-n flex-1 flex-col gap-sm"
        onSubmit={handleSubmitWrapper(handleSubmit)}
      >
        <Input
          $size="l"
          $variant="underline"
          disabled={isLoading}
          error={errors.name?.message}
          id="name"
          {...register('name')}
          label={t('common:name')}
          placeholder={t('task:taskName')}
        />
        <Row className="mt-auto gap-md">
          <GhostButton className="mr-auto" onClick={handleDelete} type="button">
            <BodyRegular $bold className="text-red">
              {t('common:delete')}
            </BodyRegular>
          </GhostButton>
          <SecondaryButton
            label={t('common:cancel')}
            onClick={onCancel}
            type="reset"
          />
          <PrimaryButton
            disabled={!isDirty || !isValid || isLoading}
            label={t('common:save')}
            type="submit"
          />
        </Row>
      </form>
      {showConfirmDelete ? (
        <DeleteTaskModal
          onCancel={handleCancelDelete}
          onSubmit={handleConfirmDelete}
          task={task}
        />
      ) : null}
    </Modal>
  );
};

export const EditTask = () => {
  const { t } = useTranslation(['task']);
  const [_, setLocation] = useLocation();
  const { taskId } = useParams<{
    taskId: string;
  }>();

  const { data, loading } = useGetTaskQuery({
    variables: { _id: taskId },
  });
  const task = data?.getTaskById;

  const handleClose = () => {
    setLocation(ROUTES.TASKS());
  };

  if (loading)
    return (
      <Modal className="w-xxl" onClose={handleClose} title={t('task:editTask')}>
        <Spinner />
      </Modal>
    );

  if (!task) return <Redirect to={ROUTES.TASKS()} />;

  return (
    <EditTaskModal onCancel={handleClose} onSubmit={handleClose} task={task} />
  );
};
