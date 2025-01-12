import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';
import type { WithTestID } from '../../types/WithTestID';

export const colStyles = clsx('flex-col');

export const Col = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & WithTestID>
>(({ children, className, testID, ...props }, ref) => {
  const combinedClassName = clsx(colStyles, className);

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

Col.displayName = 'Col';
