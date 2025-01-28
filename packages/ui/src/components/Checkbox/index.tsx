import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { IoCheckmark } from 'react-icons/io5';
import type { WithTestID } from '../../types/WithTestID';
import { InputError, InputNote } from '../Input';
import { Col } from '../Col';
import { textVariantStyles } from '../typography';
import { size } from '../../theme';

const checkboxContainerLabelStyles = clsx(
  'flex-row',
  'text-md',
  'cursor-pointer',
  'items-center',
  'group',
  'has-[input:disabled]:opacity-30',
  'has-[input:disabled]:cursor-default',
);

const fakeCheckboxStyles = clsx(
  'rounded-xs',
  'border',
  'border-o30',
  'transition-colors',
  'group-hover:bg-o10',
  'group-active:bg-o20',
  'peer-focus:border-p700',
  'peer-checked:*:opacity-100',
);

const checkboxLabelSizeStyles = {
  m: clsx('ml-xs', textVariantStyles.bodyRegular),
  l: clsx('ml-sm', textVariantStyles.bodyLarge),
};

const fakeCheckboxSizeStyles = {
  m: clsx('w-xxs', 'h-xxs'),
  l: clsx('w-xs', 'h-xs'),
};

const checkmarkStyles = clsx('opacity-0', 'text-p500');

const checkboxDummyStyles = clsx('w-n', 'h-n', '!border-none', '!outline-none');

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  WithTestID & {
    hideError?: boolean;
    error?: string;
    note?: string;
    label?: string;
    id: string;
    $size?: 'm' | 'l';
  };

const checkboxSize = {
  m: size.xxs,
  l: size.xs,
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { error, label, note, id, hideError = true, $size = 'm', testID, ...props },
    ref,
  ) => {
    return (
      <Col className={clsx((note || !hideError) && 'pb-[0.875rem]')}>
        <label className={clsx(checkboxContainerLabelStyles)}>
          <input
            aria-describedby={
              (error && `${id}Error`) || (note && `${id}Note`) || undefined
            }
            aria-invalid={error ? 'true' : 'false'}
            aria-labelledby={label ? `${id}Label` : undefined}
            className={clsx('peer', checkboxDummyStyles)}
            data-testid={testID}
            id={id}
            ref={ref}
            type="checkbox"
            {...props}
          />
          <Col
            className={clsx(fakeCheckboxStyles, fakeCheckboxSizeStyles[$size])}
          >
            <IoCheckmark
              className={checkmarkStyles}
              size={checkboxSize[$size]}
            />
          </Col>
          {label ? (
            <span className={checkboxLabelSizeStyles[$size]} id={`${id}Label`}>
              {label}
            </span>
          ) : null}
        </label>
        {note && (!error || hideError) ? (
          <InputNote id={`${id}Note`}>{note}</InputNote>
        ) : null}
        {!hideError && error ? (
          <InputError id={`${id}Error`}>{error}</InputError>
        ) : null}
      </Col>
    );
  },
);

Checkbox.displayName = 'Checkbox';
