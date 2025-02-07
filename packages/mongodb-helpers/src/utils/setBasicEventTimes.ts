import type { Document } from 'mongoose';
import type { BaseDocumentFields } from '../constants';

export const setBasicEventTimes = (
  document: Document & Pick<BaseDocumentFields, 'createdAt'>,
) => {
  if (!document.createdAt) {
    document.set({ createdAt: Date.now() });
  }
  document.set({ updatedAt: Date.now() });
};
