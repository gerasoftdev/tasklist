import { clsx } from 'clsx';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const textVariantStyles = {
  h1: clsx('text-xxl', 'leading-10', 'font-semibold'),
  h2: clsx('text-xl', 'leading-9', 'font-semibold'),
  h3: clsx('text-lg', 'leading-8', 'font-semibold'),
  bodyLarge: clsx('text-md', 'leading-8'),
  bodyRegular: clsx('text-sm', 'leading-6'),
  bodySmall: clsx('text-xs', 'leading-5'),
  note: clsx('text-xxs', 'leading-[12px]'),
};

type TextProps = HTMLAttributes<HTMLSpanElement> & {
  $bold?: boolean;
  $variant?: keyof typeof textVariantStyles | null;
};

export const Text: FC<PropsWithChildren<TextProps>> = ({
  children,
  className,
  $variant = 'bodyRegular',
  $bold,
  ...props
}) => {
  const combinedClassName = clsx(
    className,
    $variant && textVariantStyles[$variant],
    $bold ? 'font-semibold' : 'font-light',
  );

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

export const H1: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="h1" />
);

export const H2: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="h2" />
);

export const H3: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="h3" />
);

export const BodyLarge: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="bodyLarge" />
);

export const BodyRegular: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="bodyRegular" />
);

export const BodySmall: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="bodySmall" />
);

export const Note: FC<Omit<TextProps, '$variant'>> = (props) => (
  <Text {...props} $variant="note" />
);

const linkTextStyles = clsx(
  'transition-opacity',
  'cursor-pointer',
  'underline',
  'hover:opacity-80',
);

export const LinkText: FC<PropsWithChildren<TextProps>> = ({
  className = '',
  ...props
}) => {
  const combinedClassName = clsx(linkTextStyles, className);

  return <Text className={combinedClassName} {...props} />;
};
