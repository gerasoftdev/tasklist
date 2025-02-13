import type { ChangeEvent, FC } from 'react';
import { BodyLarge, ButtonBase, Checkbox, Col, size } from '@repo/ui';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import type { Task as TaskType } from '@repo/types';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { RouterLink } from '@/components/RouterLink';
import { useMockTaskApi } from '@/hooks/mockTaskApi';
import { ROUTES } from '@/constants/routes';

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = ({ task: { _id, name, isCompleted } }) => {
  const { t } = useTranslation(['task']);
  const { updateTask } = useMockTaskApi();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask(_id, { isCompleted: e.target.checked });
  };

  return (
    <Col className="border-g300 border-b">
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
          id={_id}
          onChange={handleCheckbox}
          type="checkbox"
        />
        <RouterLink
          className={clsx(
            'flex-1',
            isCompleted ? 'text-g500' : 'text-g900',
            isCompleted && 'line-through',
          )}
          to={ROUTES.TASKS({ taskId: _id })}
        >
          <BodyLarge>{name}</BodyLarge>
        </RouterLink>
        <Col className="p-sm">
          <IoEllipsisHorizontal size={size.xs} />
        </Col>
      </ButtonBase>
    </Col>
  );
};
