import { useMemo } from "react";
import { Rnd } from "react-rnd";
import { useWindow } from "@/hooks";
import styles from "@/styles/components/window.module.scss";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { ComponentRenderer } from "../component-renderer";
import { Icon } from "../icon";
import { StatusBar } from "./status-bar";
import { TitleBar } from "./title-bar";
import { ToolBars } from "./tool-bars";

export const Window: React.FC<{ task: TaskType; index: number }> = ({
  task,
  index,
}) => {
  const window = useWindow(task);

  // Calculate z-index: active window is always on top, others by their order
  const zIndex = useMemo(() => {
    if (window.active) return 9999;
    return index + 5;
  }, [window.active, index]);

  if (window.minimized) return null;

  return (
    <Rnd
      style={{
        display: "inline-flex",
        padding: window.maximized ? 0 : undefined,
        boxShadow: window.maximized ? "none" : undefined,
        zIndex,
      }}
      className={cn(styles.window, {
        [styles.active]: window.active,
      })}
      onMouseDown={window.focus}
      onDrag={window.onDrag}
      onResize={window.onResize}
      size={window.size}
      position={window.position}
      minWidth={window.minSize?.width}
      minHeight={window.minSize?.height}
      maxWidth="100%"
      maxHeight="100%"
      dragHandleClassName={styles.titleBar}
      disableDragging={!window.active}
      enableResizing={window.resizable && window.active}
      bounds="parent"
    >
      <TitleBar {...window} />
      <ToolBars />
      <div className={styles.content}>
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
