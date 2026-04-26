"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/window-switcher.module.scss";
import { getWindowsByZIndex } from "@/utils/window-manager";
import { Icon } from "./icon";

export const WindowSwitcher: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [windows, setWindows] = useState<ReturnType<typeof getWindowsByZIndex>>(
    [],
  );
  const switcherRef = useRef<HTMLDivElement>(null);
  const altHeldRef = useRef(false);

  const { activeTask, focusTask } = useSystem();

  // Show window switcher
  const showSwitcher = useCallback(
    (cycleBackwards = false) => {
      const allWindows = getWindowsByZIndex();

      // If only one window, switch to it immediately
      if (allWindows.length === 1) {
        focusTask(allWindows[0]?.id ?? null);
        return;
      }

      if (allWindows.length < 2) return;

      // Find currently active window index
      const activeIndex = allWindows.findIndex((w) => w.id === activeTask);
      const startIndex = activeIndex >= 0 ? activeIndex : 0;

      // Calculate new index
      const newIndex = cycleBackwards
        ? (startIndex - 1 + allWindows.length) % allWindows.length
        : (startIndex + 1) % allWindows.length;

      setWindows(allWindows);
      setSelectedIndex(newIndex);
      setIsVisible(true);
    },
    [activeTask, focusTask],
  );

  // Cycle through windows
  const cycleSwitcher = useCallback(
    (backwards = false) => {
      if (windows.length === 0) return;

      setSelectedIndex((prev) => {
        if (backwards) {
          return (prev - 1 + windows.length) % windows.length;
        }
        return (prev + 1) % windows.length;
      });
    },
    [windows.length],
  );

  // Close switcher and select active window
  const closeAndSelect = useCallback(() => {
    if (!isVisible) return;

    const selectedWindow = windows[selectedIndex];
    if (selectedWindow) {
      focusTask(selectedWindow.id);
    }

    setIsVisible(false);
    setWindows([]);
  }, [isVisible, selectedIndex, windows, focusTask]);

  // Cancel switcher
  const cancelSwitcher = useCallback(() => {
    setIsVisible(false);
    setWindows([]);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Tab or Alt+` or Alt+1 to show switcher
      if (
        e.altKey &&
        (e.key === "Tab" || e.code === "Backquote" || e.key === "1")
      ) {
        e.preventDefault();

        if (isVisible) {
          cycleSwitcher(e.shiftKey);
        } else {
          showSwitcher(e.shiftKey);
        }
        return;
      }

      // Cancel on any other key
      if (isVisible && !e.altKey) {
        cancelSwitcher();
      }

      // Track Alt key
      if (e.key === "Alt") {
        altHeldRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Release Alt to select
      if (!e.altKey && altHeldRef.current) {
        altHeldRef.current = false;
        closeAndSelect();
      }
    };

    const handleBlur = () => {
      // Cancel on window blur
      cancelSwitcher();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isVisible, cycleSwitcher, showSwitcher, closeAndSelect, cancelSwitcher]);

  if (!isVisible || windows.length < 2) return null;

  return (
    <div ref={switcherRef} className={styles.switcher}>
      <ul className={styles.list}>
        {windows.map((task, index) => (
          <li
            key={task.id}
            className={`${styles.item} ${
              index === selectedIndex ? styles.active : ""
            }`}
          >
            <Icon name={task.window.icon} size={32} className={styles.icon} />
          </li>
        ))}
      </ul>
      <div className={styles.windowName}>
        {windows[selectedIndex]?.window.title ?? ""}
      </div>
    </div>
  );
};
