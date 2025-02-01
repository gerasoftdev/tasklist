import { create } from 'zustand';
import type { Task } from '@repo/types';
import { v4 as uuid } from 'uuid';

type TaskStore = {
  tasks: Task[];
  getTaskById: (_id: string) => Task | null;
  getTasks: () => Task[];
  createTask: (name: string) => void;
  updateTask: (_id: string, updatedData: Partial<Task>) => void;
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
      const newTask: Task = { _id: uuid(), name, isCompleted: false };
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
