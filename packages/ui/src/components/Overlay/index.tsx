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
);

export type OverlayProps = PropsWithChildren<ComponentProps<typeof Col>> & {
  transparent?: boolean;
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, className, transparent = false, ...props }, ref) => {
    const combinedClassName = clsx(
      overlayStyles,
      className,
      !transparent && 'bg-oD50',
    );

    return (
      <Col className={combinedClassName} ref={ref} {...props}>
        {children}
      </Col>
    );
  },
);

Overlay.displayName = 'Overlay';
