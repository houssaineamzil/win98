// Window Bounds Utilities
// Ported from 98.js os-gui $Window.js

// Ensure window stays within viewport bounds
export const applyBounds = (
  position: { x: number; y: number },
  size: { width: number; height: number },
): { x: number; y: number } => {
  const boundWidth = Math.max(
    document.body.scrollWidth,
    window.innerWidth,
  );
  const boundHeight = Math.max(
    document.body.scrollHeight,
    window.innerHeight,
  );

  return {
    x: Math.max(0, Math.min(boundWidth - size.width, position.x)),
    y: Math.max(0, Math.min(boundHeight - size.height, position.y)),
  };
};

// Ensure titlebar is always accessible (can be dragged back)
export const bringTitleBarInBounds = (
  position: { x: number; y: number },
  size: { width: number; height: number },
  titlebarHeight: number,
): { x: number; y: number } => {
  const boundWidth = Math.max(
    document.body.scrollWidth,
    window.innerWidth,
  );
  const boundHeight = Math.max(
    document.body.scrollHeight,
    window.innerHeight,
  );

  // Enough horizontal space to grab the window (enough for space past close button)
  const minHorizontalPixelsOnScreen = 40;

  const x = Math.max(
    minHorizontalPixelsOnScreen - size.width,
    Math.min(
      boundWidth - minHorizontalPixelsOnScreen,
      position.x,
    ),
  );

  const y = Math.max(
    0,
    Math.min(
      boundHeight - titlebarHeight - 5,
      position.y,
    ),
  );

  return { x, y };
};

// Center a window in the viewport
export const centerWindow = (
  size: { width: number; height: number },
): { x: number; y: number } => {
  return {
    x: (window.innerWidth - size.width) / 2 + window.scrollX,
    y: (window.innerHeight - size.height) / 2 + window.scrollY,
  };
};

// Get taskbar height if it exists
export const getTaskbarHeight = (): number => {
  const taskbar = document.querySelector("[data-taskbar]");
  return taskbar?.getBoundingClientRect().height ?? 0;
};

// Calculate maximize dimensions
export const getMaximizeDimensions = (): {
  width: number;
  height: number;
  x: number;
  y: number;
} => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const scrollbarHeight = window.innerHeight - document.documentElement.clientHeight;
  const taskbarHeight = getTaskbarHeight();

  return {
    width: window.innerWidth - scrollbarWidth,
    height: window.innerHeight - scrollbarHeight - taskbarHeight,
    x: 0,
    y: 0,
  };
};
