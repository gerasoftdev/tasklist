/* eslint-disable react/button-has-type -- it is safe to assume it will be of allowed types */
import { clsx } from 'clsx';
import type {
  FC,
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { BodyRegular } from '../typography';

export const buttonVariantStyles = {
  primary: clsx(
    'disabled:!bg-p700',
    'bg-p700',
    'hover:bg-p500',
    'active:bg-p300',
    'text-g100',
  ),
  secondary: clsx(
    'disabled:!bg-o10',
    'bg-o10',
    'hover:bg-o20',
    'active:bg-o30',
    'text-g900',
  ),
  outline: clsx(
    'disabled:!bg-transparent',
    'bg-transparent',
    'border',
    'border-o30',
    'hover:bg-o10',
    'active:bg-o20',
    'text-g900',
  ),
  ghost: clsx(
    'disabled:!bg-transparent',
    'bg-transparent',
    'hover:bg-o10',
    'active:bg-o20',
    'text-g900',
  ),
};

export const buttonSizeStyles = {
  l: clsx('p-sm', 'rounded-lg'),
  m: clsx('px-sm', 'py-xs', 'rounded-md'),
  s: clsx('p-xs', 'rounded-xs'),
};

export const buttonSizeTextStyles = {
  l: clsx('px-md'),
  m: clsx('px-sm'),
  s: clsx('px-xs'),
};

export const buttonBaseStyles = clsx(
  'transition-colors',
  'cursor-pointer',
  'disabled:opacity-70',
  'disabled:cursor-default',
  'items-center',
);

type ButtonSizeProps = {
  $size?: keyof typeof buttonSizeStyles | null;
};
type ButtonVariantProps = {
  $variant?: keyof typeof buttonVariantStyles | null;
};

type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonSizeProps &
  ButtonVariantProps;

export const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  children,
  className,
  $variant = 'ghost',
  $size = 'l',
  type = 'button',
  ...props
}) => {
  const combinedClassName = clsx(
    className,
    buttonBaseStyles,
    $variant && buttonVariantStyles[$variant],
    $size && buttonSizeStyles[$size],
  );

  return (
    <button className={combinedClassName} type={type} {...props}>
      {children}
    </button>
  );
};

type ButtonProps = ButtonBaseProps & {
  label?: string;
  IconLeft?: ReactNode;
  IconRight?: ReactNode;
  children?: ReactNode;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  label,
  IconLeft,
  IconRight,
  children,
  className,
  $variant = 'ghost',
  $size = 'l',
  type = 'button',
  ...props
}) => {
  const combinedClassName = clsx(
    className,
    buttonBaseStyles,
    $variant && buttonVariantStyles[$variant],
    $size && buttonSizeStyles[$size],
  );

  return (
    <button className={combinedClassName} type={type} {...props}>
      {IconLeft}
      {label ? (
        <BodyRegular
          $bold
          className={$size ? buttonSizeTextStyles[$size] : undefined}
        >
          {label}
        </BodyRegular>
      ) : null}
      {children}
      {IconRight}
    </button>
  );
};

type ColoredButtonProps = Omit<ButtonProps, '$variant'>;

export const PrimaryButton: FC<PropsWithChildren<ColoredButtonProps>> = (
  props,
) => <Button $variant="primary" {...props} />;

export const SecondaryButton: FC<PropsWithChildren<ColoredButtonProps>> = (
  props,
) => <Button $variant="secondary" {...props} />;

export const OutlineButton: FC<PropsWithChildren<ColoredButtonProps>> = (
  props,
) => <Button $variant="outline" {...props} />;

export const GhostButton: FC<PropsWithChildren<ColoredButtonProps>> = (
  props,
) => <Button $variant="ghost" {...props} />;
