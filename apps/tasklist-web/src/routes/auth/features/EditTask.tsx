import { useMemo, type FC } from 'react';
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
} from '@repo/ui';
import { Redirect, useLocation, useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { taskSchemaFields } from '@repo/validation-schema';
import type { Task } from '@repo/types';
import { useMockTaskApi } from '@/hooks/mockTaskApi';
import { ROUTES } from '@/constants/routes';

const formSchema = object({
  name: taskSchemaFields.name,
});

type FormData = TypeOf<typeof formSchema>;

type EditTaskContentProps = {
  onSubmit: () => void;
  onCancel: () => void;
  task: Task;
};

export const EditTaskModal: FC<EditTaskContentProps> = ({
  onSubmit,
  onCancel,
  task,
}) => {
  const { t } = useTranslation(['common', 'task']);
  const { updateTask } = useMockTaskApi();

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
    updateTask(task._id, data);
    onSubmit();
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
          error={errors.name?.message}
          id="name"
          {...register('name')}
          label={t('common:name')}
          placeholder={t('task:taskName')}
        />
        <Row className="mt-auto gap-md">
          <GhostButton className="mr-auto" type="button">
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
            disabled={!isDirty || !isValid}
            label={t('common:save')}
            type="submit"
          />
        </Row>
      </form>
    </Modal>
  );
};

export const EditTask = () => {
  const [_, setLocation] = useLocation();
  const { taskId } = useParams<{
    taskId: string;
  }>();

  const { getTaskById } = useMockTaskApi();

  const task = useMemo(() => getTaskById(taskId), [taskId, getTaskById]);

  const handleClose = () => {
    setLocation(ROUTES.TASKS());
  };

  if (!task) return <Redirect to={ROUTES.TASKS()} />;

  return (
    <EditTaskModal onCancel={handleClose} onSubmit={handleClose} task={task} />
  );
};
