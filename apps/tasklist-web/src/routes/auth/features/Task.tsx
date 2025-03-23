import type { ChangeEvent, FC } from 'react';
import { BodyLarge, ButtonBase, Checkbox, Col, size } from '@repo/ui';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import type { GetTasksQuery } from '@repo/graphql';
import { RouterLink } from '@/components/RouterLink';
import { ROUTES } from '@/constants/routes';
import { useUpdateTaskMutation } from '@/hooks/apollo/api';

type Props = {
  task: GetTasksQuery['getTasks']['data'][number];
};

export const Task: FC<Props> = ({ task: { _id, name, isCompleted } }) => {
  const { t } = useTranslation(['task']);
  const [updateTaskMutation, { loading: updating }] = useUpdateTaskMutation();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskMutation({
      variables: { data: { _id, isCompleted: e.target.checked } },
    });
  };

  return (
    <Col className="border-b border-g300">
      <ButtonBase
        $size={null}
        className={clsx('items-center', 'rounded-sm')}
        tabIndex={-1}
      >
        <Checkbox
          $size="l"
          aria-label={t('task:completed')}
          checked={isCompleted}
          className="p-sm"
          disabled={updating}
          id={_id}
          onChange={handleCheckbox}
          type="checkbox"
        />
        <RouterLink
          className={clsx(
            'flex-1',
            'items-center',
            isCompleted ? 'text-g500' : 'text-g900',
            isCompleted && 'line-through',
          )}
          to={ROUTES.TASKS({ taskId: _id })}
        >
          <BodyLarge>{name}</BodyLarge>
          <Col className="ml-auto p-sm">
            <IoEllipsisHorizontal size={size.xs} />
          </Col>
        </RouterLink>
      </ButtonBase>
    </Col>
  );
};
