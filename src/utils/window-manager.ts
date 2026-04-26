// Window Manager - Handles global window state (z-index, focus, registry)
// Ported from 98.js os-gui $Window.js with React-friendly architecture

import type { TaskType } from "@/types";

// Global z-index counter - always increments to ensure unique stacking
let zIndexCounter = 5;

// Window registry - tracks all open windows
const windowRegistry = new Map<string, TaskType>();

// Focus tracking - stores last focused element per container
const lastFocusByContainer = new WeakMap<Element, Element>();

// Get next z-index (atomic increment)
export const getNextZIndex = (): number => {
  zIndexCounter++;
  return zIndexCounter;
};

// Register a window
export const registerWindow = (taskId: string, task: TaskType): void => {
  windowRegistry.set(taskId, task);
};

// Unregister a window
export const unregisterWindow = (taskId: string): void => {
  windowRegistry.delete(taskId);
};

// Get all registered windows
export const getAllWindows = (): TaskType[] => {
  return Array.from(windowRegistry.values());
};

// Get window by ID
export const getWindow = (taskId: string): TaskType | undefined => {
  return windowRegistry.get(taskId);
};

// Sort windows by z-index (descending - highest first)
export const getWindowsByZIndex = (): TaskType[] => {
  return getAllWindows().sort((a, b) => {
    const za = (a.window as unknown as { zIndex?: number }).zIndex ?? 0;
    const zb = (b.window as unknown as { zIndex?: number }).zIndex ?? 0;
    return zb - za;
  });
};

// Set last focused element for a container
export const setLastFocus = (container: Element, element: Element): void => {
  lastFocusByContainer.set(container, element);
};

// Get last focused element for a container
export const getLastFocus = (container: Element): Element | undefined => {
  return lastFocusByContainer.get(container);
};

// Find tabbable elements within a container (simplified from 98.js)
export const findTabstops = (container: Element): Element[] => {
  const selector = `
    input:enabled,
    textarea:enabled,
    select:enabled,
    button:enabled,
    a[href],
    [tabIndex='0'],
    details summary,
    iframe,
    [contenteditable]:not([contenteditable='false'])
  `;

  const elements = Array.from(container.querySelectorAll(selector));

  // Filter out non-tabbable elements and handle radio buttons
  const tabbable: Element[] = [];
  const radios = new Map<string, Element>();

  for (const el of elements) {
    const htmlEl = el as HTMLElement;

    // Check visibility
    if (htmlEl.offsetParent === null) continue;

    // Handle radio buttons as groups
    if (
      htmlEl.tagName === "INPUT" &&
      (htmlEl as HTMLInputElement).type === "radio"
    ) {
      const name = (htmlEl as HTMLInputElement).name;
      const existing = radios.get(name);
      if (existing) {
        if ((htmlEl as HTMLInputElement).checked) {
          // Replace with checked version
          const idx = tabbable.indexOf(existing);
          if (idx > -1) tabbable[idx] = el;
          radios.set(name, el);
        }
        continue;
      }
      radios.set(name, el);
    }

    tabbable.push(el);
  }

  return tabbable;
};

// Refocus last focused element or first tabbable
export const refocus = (container: Element): void => {
  const lastFocus = getLastFocus(container);

  if (lastFocus && container.contains(lastFocus)) {
    (lastFocus as HTMLElement).focus({ preventScroll: true });
    return;
  }

  const tabstops = findTabstops(container);

  if (tabstops.length > 0) {
    (tabstops[0] as HTMLElement).focus({ preventScroll: true });
  } else {
    (container as HTMLElement).focus({ preventScroll: true });
  }
};

// Reset z-index counter (useful for testing)
export const resetZIndex = (): void => {
  zIndexCounter = 5;
};

// Get current highest z-index
export const getCurrentZIndex = (): number => {
  return zIndexCounter;
};
