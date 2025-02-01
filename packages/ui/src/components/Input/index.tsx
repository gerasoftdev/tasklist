import type {
  ComponentProps,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { textVariantStyles } from '../typography';
import type { WithTestID } from '../../types/WithTestID';
import { Col } from '../Col';
import { Row } from '../Row';

const inputBaseStyles = clsx(
  'text-g900',
  'bg-transparent',
  'border-none',
  'outline-none',
  'flex-1',
  'min-w-n',
  'placeholder:text-o30',
);

export const InputBase = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & WithTestID
>(({ className, testID, ...props }, ref) => {
  const combinedClassName = clsx(inputBaseStyles, className);

  return (
    <input
      className={combinedClassName}
      data-testid={testID}
      ref={ref}
      {...props}
    />
  );
});
InputBase.displayName = 'InputBase';

export const inputContainerLabelStyles = clsx('flex-col', 'gap-xxs');

export const inputLabelStyles = clsx(
  textVariantStyles.note,
  'text-g500',
  'select-none',
);
export const InputLabel = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
>(({ children, className, ...props }, ref) => {
  const combinedClassName = clsx(inputLabelStyles, className);

  return (
    <span className={combinedClassName} ref={ref} {...props}>
      {children}
    </span>
  );
});
InputLabel.displayName = 'InputLabel';

export const inputNoteStyles = clsx(
  textVariantStyles.note,
  'absolute',
  'bottom-n',
  'text-g500',
);
export const InputNote = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
>(({ children, className, ...props }, ref) => {
  const combinedClassName = clsx(inputNoteStyles, className);

  return (
    <small className={combinedClassName} ref={ref} {...props}>
      {children}
    </small>
  );
});
InputNote.displayName = 'InputNote';

export const inputErrorStyles = clsx(
  textVariantStyles.note,
  'text-red',
  'absolute',
  'bottom-n',
);
export const InputError = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
>(({ children, className, ...props }, ref) => {
  const combinedClassName = clsx(inputErrorStyles, className);

  return (
    <small className={combinedClassName} ref={ref} {...props}>
      {children}
    </small>
  );
});
InputError.displayName = 'InputError';

export type InputProps = ComponentProps<typeof InputBase> & {
  hideError?: boolean;
  error?: string;
  note?: string;
  label?: string;
  id: string;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
};

type InputWrapperProps = Omit<InputProps, 'children'> & {
  children: (ref: React.ForwardedRef<HTMLInputElement>) => React.ReactNode;
  labelStyles?: string;
  noteStyles?: string;
  errorStyles?: string;
};

export const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>(
  (
    {
      children,
      error,
      label,
      note,
      id,
      hideError,
      labelStyles,
      noteStyles,
      errorStyles,
      className = '',
    },
    ref,
  ) => {
    return (
      <Col className={clsx((note || !hideError) && 'pb-[0.875rem]', className)}>
        <label className={inputContainerLabelStyles}>
          {label ? (
            <span
              className={clsx(inputLabelStyles, labelStyles)}
              id={`${id}Label`}
            >
              {label}
            </span>
          ) : null}
          {children(ref)}
        </label>
        {note && (!error || hideError) ? (
          <InputNote className={noteStyles} id={`${id}Note`}>
            {note}
          </InputNote>
        ) : null}
        {!hideError && error ? (
          <InputError className={errorStyles} id={`${id}Error`}>
            {error}
          </InputError>
        ) : null}
      </Col>
    );
  },
);

InputWrapper.displayName = 'InputWrapper';

type InputVariantProps = {
  $variant?: 'outline' | 'underline';
  $size?: 'm' | 'l';
};

export const inputGroupVariantStyles = {
  underline: clsx(
    'items-center',
    'border-b',
    'border-o20',
    'cursor-text',
    'focus-within:border-p500',
    'has-[input[aria-invalid="true"]]:border-red',
    'has-[input:disabled]:cursor-default',
  ),

  outline: clsx(
    'bg-o10',
    'rounded-sm',
    'outline',
    'outline-o20',
    'outline-1',
    'focus-within:outline-1',
    'focus-within:outline-p500',
    'has-[input[aria-invalid="true"]]:outline-red',
  ),
};

const inputVariantInfoStyles = {
  outline: clsx('mx-sm'),
  underline: clsx('mx-n'),
};

const inputSizeStyles = {
  m: clsx(textVariantStyles.bodyRegular),
  l: clsx(textVariantStyles.bodyLarge),
};

const inputVariantStyles = {
  underline: clsx('py-xs'),

  outline: clsx('px-sm', 'py-xs'),
};

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & InputVariantProps
>(
  (
    {
      error,
      IconLeft: before,
      IconRight: after,
      hideError,
      label,
      note,
      id,
      $variant = 'outline',
      $size = 'm',
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <InputWrapper
        className={clsx('has-[input:disabled]:opacity-70', className)}
        error={error}
        errorStyles={inputVariantInfoStyles[$variant]}
        hideError={hideError}
        id={id}
        label={label}
        labelStyles={inputVariantInfoStyles[$variant]}
        note={note}
        noteStyles={inputVariantInfoStyles[$variant]}
        ref={ref}
      >
        {(innerRef) => (
          <Row
            className={clsx('items-center', inputGroupVariantStyles[$variant])}
          >
            {before}
            <InputBase
              aria-describedby={
                (error && `${id}Error`) || (note && `${id}Note`) || undefined
              }
              aria-invalid={error ? 'true' : 'false'}
              aria-labelledby={label ? `${id}Label` : undefined}
              className={clsx(
                inputSizeStyles[$size],
                inputVariantStyles[$variant],
              )}
              id={id}
              ref={innerRef}
              {...props}
            />
            {after}
          </Row>
        )}
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';
