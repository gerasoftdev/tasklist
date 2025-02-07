import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setBasicEventTimes } from '.';

describe('setBasicEventTimes', () => {
  const mockSet = vi.fn();

  const createMockDocument = (createdAt: Date | undefined) => ({
    createdAt,
    set: mockSet,
  });

  beforeEach(() => {
    mockSet.mockClear();
  });

  it('should set createdAt if it is not defined', () => {
    const mockDocument = createMockDocument(undefined);

    setBasicEventTimes(mockDocument as any); // Cast as `Document & BaseDocumentFields`

    expect(mockSet).toHaveBeenCalledWith({ createdAt: expect.any(Number) });
    expect(mockSet).toHaveBeenCalledWith({ updatedAt: expect.any(Number) });
    expect(mockSet).toHaveBeenCalledTimes(2);
  });

  it('should not overwrite createdAt if it is already defined', () => {
    const existingCreatedAt = new Date('2023-01-01T00:00:00Z');
    const mockDocument = createMockDocument(existingCreatedAt);

    setBasicEventTimes(mockDocument as any);

    expect(mockSet).not.toHaveBeenCalledWith({ createdAt: expect.any(Number) });
    expect(mockSet).toHaveBeenCalledWith({ updatedAt: expect.any(Number) });
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('should always set updatedAt to the current time', () => {
    const mockDocument = createMockDocument(new Date('2023-01-01T00:00:00Z'));

    const beforeCall = Date.now();
    setBasicEventTimes(mockDocument as any);
    const afterCall = Date.now();

    const updatedAtCall = mockSet.mock.calls.find(
      ([arg]) => 'updatedAt' in arg,
    );
    expect(updatedAtCall).toBeDefined();
    const updatedAtValue = updatedAtCall?.[0].updatedAt;

    expect(updatedAtValue).toBeGreaterThanOrEqual(beforeCall);
    expect(updatedAtValue).toBeLessThanOrEqual(afterCall);
  });
});
