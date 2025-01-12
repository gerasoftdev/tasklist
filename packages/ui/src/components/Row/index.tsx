import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';
import type { WithTestID } from '../../types/WithTestID';

export const rowStyles = clsx('flex-row');

export const Row = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & WithTestID>
>(({ children, className, testID, ...props }, ref) => {
  const combinedClassName = clsx(rowStyles, className);

  return (
    <div
      className={combinedClassName}
      data-testid={testID}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Row.displayName = 'Row';
