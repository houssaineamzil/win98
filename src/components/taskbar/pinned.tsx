import { useSystem } from "@/stores/system.store";
import { useTaskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.scss";
import type { ApplicationType } from "@/types";
import { uid, Window as WindowClass } from "@/utils";
import { Icon } from "../icon";
import { Tooltip } from "../tooltip";

export const Pinned: React.FC = () => {
  const pinned = useTaskbar((state) => state.pinned);

  const handleClick = (app: {
    id: string;
    name: string;
    icon: string;
    component?: string;
    data?: Record<string, unknown>;
    href?: string;
    application?: string;
  }) => {
    if (app.href) {
      window.open(app.href, "_blank");
      return;
    }

    const taskID = uid();
    const windowInstance = new WindowClass({
      title: app.name,
      icon: app.icon,
      position: { x: 100 + Math.random() * 50, y: 100 + Math.random() * 50 },
      size: { width: 800, height: 600 },
      minSize: { width: 400, height: 300 },
    });

    // For component-based apps (InternetExplorer, etc.)
    if (app.component) {
      useSystem.setState((state) => ({
        tasks: {
          ...state.tasks,
          [taskID]: {
            id: taskID,
            application: {
              name: app.name,
              icon: app.icon,
              description: "",
              version: "",
              resizable: true,
              component: app.component,
              data: app.data,
              position: windowInstance.position,
              size: windowInstance.size,
              minSize: windowInstance.minSize,
              content: null,
            } as unknown as ApplicationType,
            window: windowInstance,
          },
        },
        activeTask: taskID,
      }));
    }
  };

  return (
    <div className={styles.pinned}>
      {pinned.map((app) => {
        return (
          <Tooltip key={app.id} content={app.tooltip || app.name}>
            <button
              type="button"
              className={styles.pinnedApp}
              onClick={() => handleClick(app)}
              title={app.name}
            >
              <Icon name={app.icon} size={16} />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};
