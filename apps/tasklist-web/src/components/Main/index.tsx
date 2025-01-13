import { clsx } from 'clsx';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

const mainStyles = clsx(
  'flex-col',
  'mx-auto',
  'my-n',
  'w-11/12',
  'py-xl',
  'px-lg',
  'max-w-screen-md',
);

export const Main: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  className,
  ...props
}) => <main className={clsx(mainStyles, className)} {...props} />;
