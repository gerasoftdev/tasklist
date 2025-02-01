import type { FC } from 'react';
import React, { useState } from 'react';
import { GhostButton, Input, Row, size } from '@repo/ui';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoAdd, IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { object, type TypeOf } from 'zod';
import { taskSchemaFields } from '@repo/validation-schema';
import { useMockTaskApi } from '@/hooks/mockTaskApi';

const formSchema = object({
  name: taskSchemaFields.name,
});

type FormData = TypeOf<typeof formSchema>;

export const AddTask: FC = () => {
  const { t } = useTranslation(['task', 'common']);
  const [showControls, setShowControls] = useState(false);
  const { createTask } = useMockTaskApi();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const handleFocus = () => {
    setShowControls(true);
  };

  const onSubmit = (data: FormData) => {
    createTask(data.name);
    reset();
  };

  const handleBlur = () => {
    setShowControls(false);
    reset();
  };

  const handleSubmitMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        $size="l"
        $variant="underline"
        onFocus={handleFocus}
        {...register('name')}
        IconLeft={<IoAdd className="m-sm text-o30" size={size.xs} />}
        IconRight={
          showControls ? (
            <Row>
              <GhostButton
                $size="l"
                aria-label={t('common:submit')}
                disabled={!isDirty || !isValid}
                onMouseDown={handleSubmitMouseDown}
                type="submit"
              >
                <IoCheckmark className="text-p700" size={size.xs} />
              </GhostButton>
              <GhostButton
                $size="l"
                aria-label={t('common:discard')}
                type="reset"
              >
                <IoCloseOutline className="text-g700" size={size.xs} />
              </GhostButton>
            </Row>
          ) : null
        }
        hideError
        id="addTaskInlineInput"
        onBlur={handleBlur}
        placeholder={t('task:newTask')}
      />
    </form>
  );
};
