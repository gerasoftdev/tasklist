import { afterAll, afterEach, vitest } from 'vitest';

afterEach(() => {
  vitest.clearAllMocks();
});

afterAll(() => {
  vitest.restoreAllMocks();
});
