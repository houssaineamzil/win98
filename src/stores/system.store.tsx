import { create } from "zustand";
import type { ApplicationType, TaskType, WindowType } from "@/types";
import {
  getNextZIndex,
  registerWindow,
  unregisterWindow,
} from "@/utils/window-manager";

export enum ApplicationsEnum {
  EXPLORER = "Explorer",
  NOTEPAD = "Notepad",
}

interface SystemState {
  activeTask: string | null;
  tasks: Record<string, TaskType>;
  desktop: ApplicationsEnum[];
  settings: {
    wallpaper: string | null;
    hour12: boolean;
    locale: string;
    timezone: string;
  };
}

interface SystemActions {
  addTask: (task: TaskType) => void;
  removeTask: (taskId: string) => void;
  focusTask: (taskId: string | null) => void;
  minimizeTask: (taskId: string) => void;
  unminimizeTask: (taskId: string) => void;
  maximizeTask: (
    taskId: string,
    screenSize: { width: number; height: number },
  ) => void;
  restoreTask: (taskId: string) => void;
  moveTask: (taskId: string, position: { x: number; y: number }) => void;
  resizeTask: (taskId: string, size: { width: number; height: number }) => void;
  fullscreenTask: (
    taskId: string,
    screenSize: { width: number; height: number },
  ) => void;
  updateTaskWindow: (taskId: string, updates: Partial<WindowType>) => void;
  setSetting: <K extends keyof SystemState["settings"]>(
    key: K,
    value: SystemState["settings"][K],
  ) => void;
}

export const useSystem = create<SystemState & SystemActions>((set) => ({
  // State
  activeTask: null,
  tasks: {},
  desktop: [ApplicationsEnum.EXPLORER, ApplicationsEnum.NOTEPAD],
  settings: {
    wallpaper: null,
    hour12: true,
    locale: "en-US",
    timezone: "Africa/Casablanca",
  },

  // Actions
  addTask: (task) => {
    registerWindow(task.id, task);
    set((state) => ({
      tasks: { ...state.tasks, [task.id]: task },
      activeTask: task.id,
    }));
  },

  removeTask: (taskId) => {
    unregisterWindow(taskId);
    set((state) => {
      const { [taskId]: _, ...rest } = state.tasks;
      const taskIds = Object.keys(state.tasks);
      const removedIndex = taskIds.indexOf(taskId);
      const newActiveTask =
        removedIndex > 0
          ? taskIds[removedIndex - 1]
          : taskIds.length > 1
            ? taskIds[1]
            : null;

      return {
        tasks: rest,
        activeTask:
          state.activeTask === taskId ? newActiveTask : state.activeTask,
      };
    });
  },

  focusTask: (taskId) => {
    if (!taskId) {
      set({ activeTask: null });
      return;
    }
    const newZIndex = getNextZIndex();
    set((state) => {
      const previousActiveId = state.activeTask;
      const newTasks = { ...state.tasks };

      // Set previous active window to inactive
      if (
        previousActiveId &&
        previousActiveId !== taskId &&
        newTasks[previousActiveId]
      ) {
        newTasks[previousActiveId] = {
          ...newTasks[previousActiveId],
          window: {
            ...newTasks[previousActiveId].window,
            active: false,
          },
        };
      }

      // Set new window to active
      newTasks[taskId] = {
        ...newTasks[taskId],
        window: {
          ...newTasks[taskId].window,
          active: true,
          minimized: false,
          zIndex: newZIndex,
        },
      };

      return {
        activeTask: taskId,
        tasks: newTasks,
      };
    });
  },

  minimizeTask: (taskId) => {
    set((state) => {
      const task = state.tasks[taskId];
      const taskIds = Object.keys(state.tasks);
      const minimizedIndex = taskIds.indexOf(taskId);
      const newActiveTask =
        minimizedIndex > 0
          ? taskIds[minimizedIndex - 1]
          : taskIds.length > 1
            ? taskIds[1]
            : null;

      return {
        activeTask:
          state.activeTask === taskId ? newActiveTask : state.activeTask,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            window: {
              ...task.window,
              active: false,
              minimized: true,
              beforeMinimize: {
                position: { ...task.window.position },
                size: { ...task.window.size },
              },
            },
          },
        },
      };
    });
  },

  unminimizeTask: (taskId) => {
    set((state) => ({
      activeTask: taskId,
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: {
            ...state.tasks[taskId].window,
            active: true,
            minimized: false,
          },
        },
      },
    }));
  },

  maximizeTask: (taskId, screenSize) => {
    set((state) => {
      const task = state.tasks[taskId];
      return {
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            window: {
              ...task.window,
              maximized: true,
              size: { width: screenSize.width, height: screenSize.height - 38 },
              position: { x: 0, y: 0 },
              beforeMaximize: {
                position: { ...task.window.position },
                size: { ...task.window.size },
              },
            },
          },
        },
      };
    });
  },

  restoreTask: (taskId) => {
    set((state) => {
      const task = state.tasks[taskId];
      const beforeMaximize = task.window.beforeMaximize;
      return {
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            window: {
              ...task.window,
              maximized: false,
              size: beforeMaximize?.size ?? task.window.size,
              position: beforeMaximize?.position ?? task.window.position,
              beforeMaximize: undefined,
            },
          },
        },
      };
    });
  },

  moveTask: (taskId, position) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: { ...state.tasks[taskId].window, position },
        },
      },
    }));
  },

  resizeTask: (taskId, size) => {
    set((state) => {
      const task = state.tasks[taskId];
      if (!task.application.resizable || !task.window.resizable) return state;

      return {
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...task,
            window: { ...task.window, size },
          },
        },
      };
    });
  },

  fullscreenTask: (taskId, screenSize) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: {
            ...state.tasks[taskId].window,
            maximized: true,
            size: { width: screenSize.width, height: screenSize.height },
            position: { x: 0, y: 0 },
          },
        },
      },
    }));
  },

  updateTaskWindow: (taskId, updates) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: { ...state.tasks[taskId].window, ...updates },
        },
      },
    }));
  },

  setSetting: (key, value) => {
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    }));
  },
}));
