import { clsx } from 'clsx';
import type { FC } from 'react';

const spinnerStyles = clsx(
  'rounded-full',
  'bg-[conic-gradient(var(--tw-gradient-stops))]',
  'from-p300',
  'to-p700',
  'w-xs',
  'h-xs',
  'animate-spin',
  'm-auto',
);

type Props = {
  testID?: string;
};

export const Spinner: FC<Props> = ({ testID = 'spinner' }) => (
  <span
    aria-roledescription="Loading"
    className={spinnerStyles}
    data-testid={testID}
    role="status"
  />
);
