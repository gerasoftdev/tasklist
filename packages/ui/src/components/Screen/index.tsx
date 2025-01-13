import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';

const screenStyles = clsx('w-full', 'min-h-full', 'flex-1');

export const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ children, className, ...props }, ref) => {
  const combinedClassName = clsx(screenStyles, className);

  return (
    <div className={combinedClassName} ref={ref} {...props}>
      {children}
    </div>
  );
});

Screen.displayName = 'Screen';
