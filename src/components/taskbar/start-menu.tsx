"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type MenuItemData, startMenuData } from "@/constants/start-menu-data";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/taskbar.module.scss";
import type { ApplicationType } from "@/types";
import { uid } from "@/utils";
import { Window } from "@/utils/window";
import { Icon } from "../icon";

interface MenuItemProps {
  item: MenuItemData;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeParent?: () => void;
  depth?: number;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  isOpen,
  onOpen,
  onClose,
  closeParent,
  depth = 0,
}) => {
  const itemRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hasSubmenu = item.isFolder || (item.options && item.options.length > 0);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hasSubmenu && onOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        onOpen();
      }, 100);
    }
  };

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleClick = () => {
    if (item.isDisabled) return;

    if (hasSubmenu && onOpen) {
      onOpen();
    } else if (item.type === "ExternalLink" && item.href) {
      window.open(item.href, "_blank");
      closeParent?.();
    } else if (item.application) {
      // Open application and close menu
      const app = item.application;
      const taskID = uid();
      const windowInstance = new Window({
        title: app.name,
        icon: app.icon,
        position: app.position,
        size: app.size,
        minSize: app.minSize,
        resizable: app.resizable,
        active: true,
      });
      useSystem.setState((state) => {
        const newTasks = { ...state.tasks };

        // Set previous active window to inactive
        if (state.activeTask && newTasks[state.activeTask]) {
          newTasks[state.activeTask] = {
            ...newTasks[state.activeTask],
            window: {
              ...newTasks[state.activeTask].window,
              active: false,
            },
          };
        }

        // Add new window as active
        newTasks[taskID] = {
          id: taskID,
          application: app,
          window: windowInstance,
        };

        return {
          tasks: newTasks,
          activeTask: taskID,
        };
      });
      closeParent?.();
    } else if (item.component) {
      // Open component-based app with data (e.g., Internet Explorer with URL)
      const taskID = uid();
      const windowInstance = new Window({
        title: item.title,
        icon: item.icon,
        position: { x: 100 + Math.random() * 50, y: 100 + Math.random() * 50 },
        size: { width: 800, height: 600 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        active: true,
      });
      // Store component info in window for the system to render
      (
        windowInstance as unknown as {
          component?: string;
          componentData?: Record<string, unknown>;
        }
      ).component = item.component;
      (
        windowInstance as unknown as {
          component?: string;
          componentData?: Record<string, unknown>;
        }
      ).componentData = item.data;
      useSystem.setState((state) => {
        const newTasks = { ...state.tasks };

        // Set previous active window to inactive
        if (state.activeTask && newTasks[state.activeTask]) {
          newTasks[state.activeTask] = {
            ...newTasks[state.activeTask],
            window: {
              ...newTasks[state.activeTask].window,
              active: false,
            },
          };
        }

        // Add new window as active
        newTasks[taskID] = {
          id: taskID,
          application: {
            name: item.title,
            icon: item.icon,
            description: "",
            version: "",
            resizable: true,
            component: item.component,
            data: item.data,
            position: windowInstance.position,
            size: windowInstance.size,
            minSize: windowInstance.minSize,
            content: null,
          } as unknown as ApplicationType,
          window: windowInstance,
        };

        return {
          tasks: newTasks,
          activeTask: taskID,
        };
      });
      closeParent?.();
    } else if (item.isShutdown) {
      useSystem.setState((state) => ({
        ...state,
        tasks: {},
        activeTask: null,
      }));
      closeParent?.();
    }
  };

  const iconSize = depth === 0 ? 20 : 16;

  const handleWrapperMouseLeave = useCallback(() => {
    // Close this submenu when leaving the entire menu item area
    onClose?.();
  }, [onClose]);

  if (item.divider) {
    return <div className={styles.dividerHorizontal} />;
  }

  return (
    <div
      className={styles.menuItemWrapper}
      onMouseLeave={handleWrapperMouseLeave}
    >
      <button
        ref={itemRef}
        type="button"
        className={`${styles.menuItem} ${item.isDisabled ? styles.disabled : ""} ${!item.icon ? styles.noIcon : ""}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-submenu-open={isOpen}
        disabled={item.isDisabled}
      >
        {item.icon && (
          <Icon
            name={item.icon}
            size={iconSize}
            className={styles.menuItemIcon}
          />
        )}
        <span className={styles.menuItemLabel}>{item.title}</span>
        {hasSubmenu && <span className={styles.menuItemArrow} />}
      </button>
      {hasSubmenu && isOpen && item.options && (
        <Submenu
          items={item.options}
          isOpen={isOpen}
          closeParent={closeParent}
          depth={depth + 1}
        />
      )}
    </div>
  );
};

interface SubmenuProps {
  items: MenuItemData[];
  isOpen?: boolean;
  closeParent?: () => void;
  depth?: number;
}

const Submenu: React.FC<SubmenuProps> = ({
  items,
  isOpen,
  closeParent,
  depth = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset openIndex when parent submenu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenIndex(null);
    }
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Show (Empty) for empty folders
  const displayItems =
    items.length === 0
      ? [{ title: "(Empty)", icon: "", isDisabled: true }]
      : items;

  return (
    <div
      className={styles.submenu}
      style={{ left: depth === 0 ? "calc(100% - 4px)" : "calc(100% - 2px)" }}
    >
      {displayItems.map((item, idx) => (
        <MenuItemComponent
          // biome-ignore lint/suspicious/noArrayIndexKey: index needed for potentially duplicate titles (dividers)
          key={`${item.title}-${idx}`}
          item={item}
          isOpen={openIndex === idx}
          onOpen={() => {
            // Close sibling submenus by resetting all other indices
            setOpenIndex(idx);
          }}
          onClose={() => setOpenIndex(null)}
          closeParent={closeParent}
          depth={depth}
        />
      ))}
    </div>
  );
};

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { activeTask, tasks } = useSystem();
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
        setOpenSubmenuIndex(null);
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (!isOpen) {
      setOpenSubmenuIndex(null);
    }
  }, [isOpen]);

  const openApplication = useCallback(
    (application: ApplicationType) => {
      const taskID = uid();

      const window = new Window({
        title: application.name,
        icon: application.icon,
        position: {
          x: activeTask
            ? (tasks[activeTask]?.window.position.x ?? 150) + 7
            : application.position.x,
          y: activeTask
            ? (tasks[activeTask]?.window.position.y ?? 150) + 7
            : application.position.y,
        },
        size: application.size,
        minSize: application.minSize,
        resizable: application.resizable,
        active: true,
      });

      useSystem.setState((state) => {
        const newTasks = { ...state.tasks };

        // Set previous active window to inactive
        if (state.activeTask && newTasks[state.activeTask]) {
          newTasks[state.activeTask] = {
            ...newTasks[state.activeTask],
            window: {
              ...newTasks[state.activeTask].window,
              active: false,
            },
          };
        }

        // Add new window as active
        newTasks[taskID] = {
          id: taskID,
          application,
          window,
        };

        return {
          tasks: newTasks,
          activeTask: taskID,
        };
      });

      onClose();
    },
    [activeTask, tasks, onClose],
  );

  const handleShutdown = useCallback(() => {
    useSystem.setState((state) => ({
      ...state,
      tasks: {},
      activeTask: null,
    }));
    onClose();
  }, [onClose]);

  const handleMenuItemClick = useCallback(
    (item: MenuItemData) => {
      if (item.isDisabled) return;

      if (item.type === "ExternalLink" && item.href) {
        window.open(item.href, "_blank");
        onClose();
      } else if (item.application) {
        openApplication(item.application);
      } else if (item.isShutdown) {
        handleShutdown();
      }
    },
    [onClose, openApplication, handleShutdown],
  );

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className={styles.startMenu}>
      <div className={styles.startMenuContent}>
        {startMenuData.map((item, index) => (
          <MenuItemComponent
            key={item.title}
            item={item}
            isOpen={openSubmenuIndex === index}
            onOpen={() => setOpenSubmenuIndex(index)}
            onClose={() => setOpenSubmenuIndex(null)}
            closeParent={() => {
              handleMenuItemClick(item);
              onClose();
            }}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
};
