import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Col } from '../Col';

export const overlayStyles = clsx(
  'p-lg',
  'fixed',
  'top-n',
  'left-n',
  'w-screen',
  'h-screen',
  'bg-oD50',
);

export const Overlay = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ComponentProps<typeof Col>>
>(({ children, className, ...props }, ref) => {
  const combinedClassName = clsx(overlayStyles, className);

  return (
    <Col className={combinedClassName} ref={ref} {...props}>
      {children}
    </Col>
  );
});

Overlay.displayName = 'Overlay';
