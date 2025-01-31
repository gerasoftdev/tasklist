import { create } from 'zustand';
import type { Task } from '@repo/types';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';

type TaskStore = {
  tasks: Task[];
  getTaskById: (id: string) => Task | null;
  getTasks: () => Task[];
  createTask: (name: string) => void;
  updateTask: (id: string, updatedData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

export const useMockTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id) || null;
      },

      getTasks: () => {
        return get().tasks;
      },

      createTask: (name) => {
        set((state) => {
          const newTask: Task = { id: uuid(), name, isCompleted: false };
          return { tasks: [...state.tasks, newTask] };
        });
      },

      updateTask: (id, updatedData) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedData } : task,
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: 'mock-task-store',
    },
  ),
);
