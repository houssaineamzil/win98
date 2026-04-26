import { useCallback, useRef } from "react";
import { Rnd } from "react-rnd";
import { useWindow } from "@/hooks";
import styles from "@/styles/components/window.module.scss";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { bringTitleBarInBounds } from "@/utils/window-bounds";
import { setLastFocus } from "@/utils/window-manager";
import { ComponentRenderer } from "../component-renderer";
import { Icon } from "../icon";
import { StatusBar } from "./status-bar";
import { TitleBar } from "./title-bar";
import { WindowMenu } from "./window-menu";

export const Window: React.FC<{ task: TaskType; index: number }> = ({
  task,
  index,
}) => {
  const window = useWindow(task);
  const contentRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);

  // Use z-index from window state (managed by window manager)
  const zIndex = window.zIndex;

  // Ensure window stays in bounds after resize
  const handleResizeStop = useCallback(() => {
    if (rndRef.current && contentRef.current) {
      const element = rndRef.current.getSelfElement();
      if (element) {
        const newPosition = bringTitleBarInBounds(
          window.position,
          window.size,
          28, // approximate titlebar height
        );
        if (
          newPosition.x !== window.position.x ||
          newPosition.y !== window.position.y
        ) {
          // Position will be updated via onDrag callback
        }
      }
    }
  }, [window.position, window.size]);

  // Track focus within window
  const handleFocusIn = useCallback((e: React.FocusEvent) => {
    const contentEl = contentRef.current;
    if (contentEl && contentEl.contains(e.target as Node)) {
      setLastFocus(contentEl, e.target as Element);
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      window.handleKeyDown(e);
    },
    [window.handleKeyDown],
  );

  if (window.minimized) return null;

  return (
    <Rnd
      style={{
        display: "inline-flex",
        padding: window.maximized ? 0 : undefined,
        boxShadow: window.maximized ? "none" : undefined,
        zIndex,
        position: "fixed",
      }}
      className={cn(styles.window, {
        [styles.active]: window.active,
      })}
      onMouseDown={window.focus}
      onDrag={window.onDrag}
      onResize={window.onResize}
      onResizeStop={handleResizeStop}
      ref={rndRef}
      size={window.size}
      position={window.position}
      minWidth={window.minSize?.width}
      minHeight={window.minSize?.height}
      maxWidth="100%"
      maxHeight="100%"
      dragHandleClassName={styles.titleBar}
      disableDragging={!window.active}
      enableResizing={window.resizable && window.active}
      resizeHandleClasses={{
        bottom: "react-resizable-handle-s",
        bottomLeft: "react-resizable-handle-sw",
        bottomRight: "react-resizable-handle-se",
        left: "react-resizable-handle-w",
        right: "react-resizable-handle-e",
        top: "react-resizable-handle-n",
        topLeft: "react-resizable-handle-nw",
        topRight: "react-resizable-handle-ne",
      }}
      bounds="parent"
    >
      <TitleBar {...window} />
      <WindowMenu menus={task.application.menu} onCloseWindow={window.close} />
      <div
        ref={contentRef}
        className={styles.content}
        onFocusCapture={handleFocusIn}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {task.application.component ? (
          <ComponentRenderer
            component={task.application.component}
            data={task.application.data as Record<string, unknown>}
            onClose={window.close}
          />
        ) : (
          task.application.content
        )}
      </div>
      <StatusBar
        right={
          <>
            <Icon size={16} name={window.icon} />
            {window.title}
          </>
        }
      />
    </Rnd>
  );
};
