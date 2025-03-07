import type { FC, PropsWithChildren } from 'react';
import { Col } from '@repo/ui';
import { clsx } from 'clsx';

const sidebarStyles = clsx('size-full', 'max-w-sm', 'bg-g100 py-lg', 'px-md');

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return <Col className={sidebarStyles}>{children}</Col>;
};
