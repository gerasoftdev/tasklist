import { clsx } from 'clsx';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

const mainStyles = clsx(
  'flex-col',
  'mx-auto',
  'w-11/12',
  'pt-lg',
  'max-w-[500px]',
);

export const Main: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  className,
  ...props
}) => <main className={clsx(mainStyles, className)} {...props} />;
