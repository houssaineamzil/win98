import { useCallback, useMemo } from "react";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";
import { useSystem } from "@/stores/system.store";
import type { TaskType } from "@/types";
import { findTabstops } from "@/utils/window-manager";

interface UseWindowReturn {
  // Window state
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  toolWindow?: boolean;
  minimizeButton?: boolean;
  maximizeButton?: boolean;
  closeButton?: boolean;
  active: boolean;
  resizable: boolean;
  maximized: boolean;
  minimized: boolean;
  isFullscreen: boolean;
  alwaysOnTop: boolean;
  zIndex: number;
  // Actions
  close: () => void;
  // Keyboard navigation
  handleKeyDown: (e: React.KeyboardEvent) => void;
  focus: () => void;
  minimize: () => void;
  unminimize: () => void;
  maximize: () => void;
  restore: () => void;
  fullscreen: () => void;
  onDrag: RndDragCallback;
  onResize: RndResizeCallback;
}

export const useWindow = (task: TaskType): UseWindowReturn => {
  // Use selectors to avoid unnecessary re-renders
  const activeTaskId = useSystem((state) => state.activeTask);
  const removeTask = useSystem((state) => state.removeTask);
  const focusTask = useSystem((state) => state.focusTask);
  const minimizeTask = useSystem((state) => state.minimizeTask);
  const unminimizeTask = useSystem((state) => state.unminimizeTask);
  const maximizeTask = useSystem((state) => state.maximizeTask);
  const restoreTask = useSystem((state) => state.restoreTask);
  const moveTask = useSystem((state) => state.moveTask);
  const resizeTask = useSystem((state) => state.resizeTask);
  const fullscreenTask = useSystem((state) => state.fullscreenTask);

  const window = task.window;
  const isActive = activeTaskId === task.id;

  const close = useCallback(() => {
    removeTask(task.id);
  }, [removeTask, task.id]);

  const focus = useCallback(() => {
    focusTask(task.id);
  }, [focusTask, task.id]);

  const minimize = useCallback(() => {
    minimizeTask(task.id);
  }, [minimizeTask, task.id]);

  const unminimize = useCallback(() => {
    if (window.minimized) {
      unminimizeTask(task.id);
    }
  }, [unminimizeTask, task.id, window.minimized]);

  const maximize = useCallback(() => {
    if (!window.maximized) {
      maximizeTask(task.id, {
        width: globalThis.window.innerWidth,
        height: globalThis.window.innerHeight - 38,
      });
    }
  }, [maximizeTask, task.id, window.maximized]);

  const restore = useCallback(() => {
    if (window.maximized) {
      restoreTask(task.id);
    }
  }, [restoreTask, task.id, window.maximized]);

  const move = useCallback(
    (position: { x: number; y: number }) => {
      moveTask(task.id, position);
    },
    [moveTask, task.id],
  );

  const resize = useCallback(
    (size: { width: number; height: number }) => {
      resizeTask(task.id, size);
    },
    [resizeTask, task.id],
  );

  const fullscreen = useCallback(() => {
    if (!window.isFullscreen) {
      fullscreenTask(task.id, {
        width: globalThis.window.innerWidth,
        height: globalThis.window.innerHeight,
      });
    }
  }, [fullscreenTask, task.id, window.isFullscreen]);

  const onDrag: RndDragCallback = useCallback(
    (event, data) => {
      move(data);
      task.application.onDrag?.(event, data);
    },
    [move, task.application],
  );

  const onResize: RndResizeCallback = useCallback(
    (event, direction, ref, delta, position) => {
      resize({
        width: Number(ref.style.width),
        height: Number(ref.style.height),
      });

      task.application.onResize?.(event, direction, ref, delta, position);
    },
    [resize, task.application],
  );

  // Keyboard navigation - Tab wrapping and arrow keys
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Don't handle if default prevented or modifier keys held
      if (e.isDefaultPrevented() || e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      // Handle Tab wrapping
      if (e.key === "Tab") {
        const contentEl = e.currentTarget as HTMLElement;
        const tabstops = findTabstops(contentEl);

        if (tabstops.length === 0) return;

        const focusedIndex = tabstops.indexOf(
          document.activeElement as Element,
        );

        if (e.shiftKey) {
          // Shift+Tab - wrap to last if at first
          if (focusedIndex === 0) {
            e.preventDefault();
            (tabstops[tabstops.length - 1] as HTMLElement).focus();
          }
        } else {
          // Tab - wrap to first if at last
          if (focusedIndex === tabstops.length - 1) {
            e.preventDefault();
            (tabstops[0] as HTMLElement).focus();
          }
        }
        return;
      }

      // Handle Escape to close
      if (e.key === "Escape") {
        close();
        return;
      }

      // Handle arrow key navigation between buttons
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const contentEl = e.currentTarget as HTMLElement;
        const buttons = Array.from(contentEl.querySelectorAll("button"));
        const focusedIndex = buttons.indexOf(e.target as HTMLButtonElement);

        if (
          e.target instanceof HTMLButtonElement &&
          focusedIndex < buttons.length - 1 &&
          !e.shiftKey
        ) {
          e.preventDefault();
          buttons[focusedIndex + 1].focus();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const contentEl = e.currentTarget as HTMLElement;
        const buttons = Array.from(contentEl.querySelectorAll("button"));
        const focusedIndex = buttons.indexOf(e.target as HTMLButtonElement);

        if (
          e.target instanceof HTMLButtonElement &&
          focusedIndex > 0 &&
          !e.shiftKey
        ) {
          e.preventDefault();
          buttons[focusedIndex - 1].focus();
        }
      }
    },
    [close],
  );

  return useMemo(
    () => ({
      title: window.title,
      icon: window.icon,
      position: window.position,
      size: window.size,
      minSize: window.minSize,
      maxSize: window.maxSize,
      toolWindow: window.toolWindow,
      minimizeButton: window.minimizeButton,
      maximizeButton: window.maximizeButton,
      closeButton: window.closeButton,
      active: isActive,
      resizable: window.resizable,
      maximized: window.maximized,
      minimized: window.minimized,
      isFullscreen: window.isFullscreen,
      alwaysOnTop: window.alwaysOnTop,
      zIndex: window.zIndex,
      close,
      focus,
      minimize,
      unminimize,
      maximize,
      restore,
      fullscreen,
      onDrag,
      onResize,
      handleKeyDown,
    }),
    [
      window,
      close,
      focus,
      minimize,
      unminimize,
      maximize,
      restore,
      fullscreen,
      onDrag,
      onResize,
      handleKeyDown,
    ],
  );
};
