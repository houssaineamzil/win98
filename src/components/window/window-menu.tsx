"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/window.module.scss";
import type { MenuBar, MenuItem } from "@/types";
import { cn } from "@/utils";

interface WindowMenuProps {
  menus?: MenuBar[];
  onCloseWindow?: () => void;
}

// Default shared menus available to all windows
const getDefaultMenus = (onClose?: () => void): MenuBar[] => [
  {
    label: "File",
    hotkey: "F",
    items: [
      { label: "New", hotkey: "N" },
      { label: "Open...", hotkey: "O" },
      { label: "Save", hotkey: "S" },
      { label: "Save As..." },
      { divider: true, label: "" },
      { label: "Close", hotkey: "C", onClick: onClose },
    ],
  },
  {
    label: "Edit",
    hotkey: "E",
    items: [
      { label: "Undo", hotkey: "U" },
      { label: "Cut", hotkey: "T" },
      { label: "Copy", hotkey: "C" },
      { label: "Paste", hotkey: "P" },
      { label: "Select All", hotkey: "A" },
    ],
  },
  {
    label: "View",
    hotkey: "V",
    items: [
      { label: "Toolbar" },
      { label: "Status Bar" },
      { divider: true, label: "" },
      {
        label: "Refresh",
        hotkey: "R",
      },
    ],
  },
  {
    label: "Help",
    hotkey: "H",
    items: [
      { label: "Help Topics", hotkey: "H" },
      { divider: true, label: "" },
      { label: "About", hotkey: "A" },
    ],
  },
];

// Merge default menus with app-specific menus
const mergeMenus = (
  defaultMenus: MenuBar[],
  appMenus?: MenuBar[],
): MenuBar[] => {
  if (!appMenus) return defaultMenus;

  const merged = [...defaultMenus];

  for (const appMenu of appMenus) {
    const existingIndex = merged.findIndex((m) => m.label === appMenu.label);
    if (existingIndex >= 0) {
      // Replace existing menu
      merged[existingIndex] = appMenu;
    } else {
      // Add new menu
      merged.push(appMenu);
    }
  }

  return merged;
};

export const WindowMenu: React.FC<WindowMenuProps> = ({
  menus,
  onCloseWindow,
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isMenuBarActive, setIsMenuBarActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const defaultMenus = getDefaultMenus(onCloseWindow);
  const mergedMenus = mergeMenus(defaultMenus, menus);

  const handleMenuClick = useCallback(
    (index: number) => {
      if (openMenuIndex === index) {
        // Click same menu - close it and deactivate menu bar
        setOpenMenuIndex(null);
        setIsMenuBarActive(false);
      } else {
        // Open menu and activate menu bar
        setOpenMenuIndex(index);
        setIsMenuBarActive(true);
      }
    },
    [openMenuIndex],
  );

  const handleMenuHover = useCallback(
    (index: number) => {
      // Only switch menus if menu bar is active
      if (isMenuBarActive) {
        setOpenMenuIndex(index);
      }
    },
    [isMenuBarActive],
  );

  const handleMenuBarMouseLeave = useCallback(() => {
    // Close all menus when leaving the menu bar
    setOpenMenuIndex(null);
    setIsMenuBarActive(false);
  }, []);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.disabled || item.divider) return;
    item.onClick?.();
    setOpenMenuIndex(null);
    setIsMenuBarActive(false);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
        setIsMenuBarActive(false);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuIndex]);

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.divider) {
      return (
        <div
          key={`divider-${index}`}
          className={styles.menuDivider}
          role="separator"
        />
      );
    }

    const labelParts = item.hotkey
      ? item.label.split(new RegExp(`(${item.hotkey})`, "i"))
      : [item.label];

    return (
      <button
        key={item.label}
        type="button"
        className={cn(styles.menuItem, {
          [styles.disabled]: item.disabled,
        })}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled}
      >
        <span className={styles.menuItemLabel}>
          {labelParts.map((part, i) =>
            item.hotkey && part.toLowerCase() === item.hotkey.toLowerCase() ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: <part is not unique>
              <span key={i} className={styles.hotkey}>
                {part}
              </span>
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: <part is not unique>
              <span key={i}>{part}</span>
            ),
          )}
        </span>
        {item.submenu && <span className={styles.arrow}>▶</span>}
      </button>
    );
  };

  return (
    <div
      ref={menuRef}
      className={styles.windowMenu}
      onMouseLeave={handleMenuBarMouseLeave}
    >
      <div className={styles.menuBar} role="menubar">
        {mergedMenus.map((menu, index) => {
          const labelParts = menu.hotkey
            ? menu.label.split(new RegExp(`(${menu.hotkey})`, "i"))
            : [menu.label];
          const isOpen = openMenuIndex === index;

          return (
            <div key={menu.label} className={styles.menuContainer}>
              <button
                type="button"
                className={cn(styles.menuButton, { [styles.active]: isOpen })}
                onClick={() => handleMenuClick(index)}
                onMouseEnter={() => handleMenuHover(index)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span>
                  {labelParts.map((part, i) =>
                    menu.hotkey &&
                    part.toLowerCase() === menu.hotkey.toLowerCase() ? (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <part is not unique>
                      <span key={i} className={styles.hotkey}>
                        {part}
                      </span>
                    ) : (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <part is not unique>
                      <span key={i}>{part}</span>
                    ),
                  )}
                </span>
              </button>
              {isOpen && menu.items && (
                <div className={styles.menuDropdown} role="menu">
                  {menu.items.map((item, itemIndex) =>
                    renderMenuItem(item, itemIndex),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
