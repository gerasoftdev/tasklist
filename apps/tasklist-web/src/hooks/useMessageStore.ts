import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

type MessageType = 'success' | 'error' | 'info' | 'warning';

export type Message = {
  id: string;
  type: MessageType;
  text: string;
  href?: string;
  remove: () => void;
};

export type MessageInput = Omit<Message, 'id' | 'remove'> & {
  id?: string;
  expireIn?: number;
};

type MessageState = {
  messages: Message[];
  addMessages: (messages: MessageInput[]) => void;
  removeMessages: () => void;
};

export const useMessageStore = create<MessageState>()((set, get) => ({
  messages: [],
  addMessages: (messages) => {
    const newMessages = messages
      .filter(
        ({ id }) => !get().messages.some((existing) => existing.id === id),
      )
      .map((message) => {
        const id = message.id || uuid();

        const remove = () => {
          set((state) => ({
            messages: state.messages.filter((m) => m.id !== id),
          }));
        };
        if (message.expireIn) {
          setTimeout(() => {
            remove();
          }, message.expireIn);
        }
        return {
          id,
          ...message,
          remove,
        };
      });

    set((state) => ({
      messages: [...state.messages, ...newMessages],
    }));
  },
  removeMessages: () => {
    set({ messages: [] });
  },
}));
