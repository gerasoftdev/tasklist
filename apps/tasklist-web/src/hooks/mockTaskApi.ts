import { create } from 'zustand';
import type { MockTaskType } from '@repo/types';
import { v4 as uuid } from 'uuid';

type TaskStore = {
  tasks: MockTaskType[];
  getTaskById: (_id: string) => MockTaskType | null;
  getTasks: () => MockTaskType[];
  createTask: (name: string) => void;
  updateTask: (_id: string, updatedData: Partial<MockTaskType>) => void;
  deleteTask: (_id: string) => void;
};

export const useMockTaskApi = create<TaskStore>((set, get) => ({
  tasks: [],

  getTaskById: (_id) => {
    return get().tasks.find((task) => task._id === _id) || null;
  },

  getTasks: () => {
    return get().tasks;
  },

  createTask: (name) => {
    set((state) => {
      const newTask: MockTaskType = { _id: uuid(), name, isCompleted: false };
      return { tasks: [...state.tasks, newTask] };
    });
  },

  updateTask: (_id, updatedData) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === _id ? { ...task, ...updatedData } : task,
      ),
    }));
  },

  deleteTask: (_id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== _id),
    }));
  },
}));
