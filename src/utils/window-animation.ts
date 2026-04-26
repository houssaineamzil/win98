// Window Animation Utilities
// Ported from 98.js os-gui $Window.js

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WindowState {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

// Animate a window's titlebar from one rect to another
export const animateTitlebar = (
  element: HTMLElement,
  fromRect: Rect,
  toRect: Rect,
  duration = 200,
  onComplete?: () => void,
): (() => void) => {
  const startTime = performance.now();
  let animationId: number;

  const easeOutQuad = (t: number): number => t * (2 - t);

  const animate = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuad(progress);

    const currentLeft = fromRect.left + (toRect.left - fromRect.left) * eased;
    const currentTop = fromRect.top + (toRect.top - fromRect.top) * eased;
    const currentWidth =
      fromRect.width + (toRect.width - fromRect.width) * eased;
    const currentHeight =
      fromRect.height + (toRect.height - fromRect.height) * eased;

    element.style.left = `${currentLeft}px`;
    element.style.top = `${currentTop}px`;
    element.style.width = `${currentWidth}px`;
    element.style.height = `${currentHeight}px`;

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  animationId = requestAnimationFrame(animate);

  // Return cancel function
  return () => {
    cancelAnimationFrame(animationId);
  };
};

// Calculate window rect for animations
export const getWindowRect = (element: HTMLElement): Rect => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
};

// Calculate titlebar rect specifically
export const getTitlebarRect = (titlebar: HTMLElement): Rect => {
  const rect = titlebar.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
};

// Animate minimize to taskbar
export const animateMinimize = (
  windowEl: HTMLElement,
  titlebarEl: HTMLElement,
  taskbarButtonEl: HTMLElement | null,
  onComplete: () => void,
): (() => void) => {
  if (!taskbarButtonEl) {
    // No animation if no taskbar button
    onComplete();
    return () => {};
  }

  const beforeRect = getTitlebarRect(titlebarEl);
  const afterRect = getTitlebarRect(taskbarButtonEl);

  return animateTitlebar(windowEl, beforeRect, afterRect, 200, () => {
    onComplete();
  });
};

// Animate unminimize from taskbar
export const animateUnminimize = (
  windowEl: HTMLElement,
  _titlebarEl: HTMLElement,
  taskbarButtonEl: HTMLElement | null,
  targetRect: Rect,
  onComplete: () => void,
): (() => void) => {
  if (!taskbarButtonEl) {
    // No animation if no taskbar button
    onComplete();
    return () => {};
  }

  const beforeRect = getTitlebarRect(taskbarButtonEl);

  return animateTitlebar(windowEl, beforeRect, targetRect, 200, () => {
    onComplete();
  });
};

// Animate maximize
export const animateMaximize = (
  windowEl: HTMLElement,
  titlebarEl: HTMLElement,
  targetRect: Rect,
  onComplete: () => void,
): (() => void) => {
  const beforeRect = getTitlebarRect(titlebarEl);

  return animateTitlebar(windowEl, beforeRect, targetRect, 150, () => {
    onComplete();
  });
};

// Animate restore
export const animateRestore = (
  windowEl: HTMLElement,
  titlebarEl: HTMLElement,
  targetRect: Rect,
  onComplete: () => void,
): (() => void) => {
  const beforeRect = getTitlebarRect(titlebarEl);

  return animateTitlebar(windowEl, beforeRect, targetRect, 150, () => {
    onComplete();
  });
};

// Save window state for restore
export const saveWindowState = (element: HTMLElement): WindowState => {
  return {
    position: {
      x: parseInt(element.style.left || "0", 10),
      y: parseInt(element.style.top || "0", 10),
    },
    size: {
      width: parseInt(element.style.width || "0", 10),
      height: parseInt(element.style.height || "0", 10),
    },
  };
};

// Apply window state
export const applyWindowState = (
  element: HTMLElement,
  state: WindowState,
): void => {
  element.style.left = `${state.position.x}px`;
  element.style.top = `${state.position.y}px`;
  element.style.width = `${state.size.width}px`;
  element.style.height = `${state.size.height}px`;
};
