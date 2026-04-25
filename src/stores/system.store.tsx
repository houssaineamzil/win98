import { create } from "zustand";
import type { ApplicationType, TaskType, WindowType } from "@/types";

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
  restoreTask: (taskId: string, app: ApplicationType) => void;
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
    set((state) => ({
      tasks: { ...state.tasks, [task.id]: task },
      activeTask: task.id,
    }));
  },

  removeTask: (taskId) => {
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

  minimizeTask: (taskId) => {
    set((state) => {
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
              ...state.tasks[taskId].window,
              active: false,
              minimized: true,
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
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: {
            ...state.tasks[taskId].window,
            maximized: true,
            size: { width: screenSize.width, height: screenSize.height - 38 },
            position: { x: 0, y: 0 },
          },
        },
      },
    }));
  },

  restoreTask: (taskId, app) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          window: {
            ...state.tasks[taskId].window,
            maximized: false,
            size: app.size,
            position: app.position,
          },
        },
      },
    }));
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
