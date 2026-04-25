import { useWindow } from "@/hooks";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/taskbar.module.scss";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { Icon } from "../icon";
export const Tasks: React.FC = () => {
  const tasks = useSystem((state) => state.tasks);

  return (
    <div className={styles.tasks}>
      {Object.values(tasks).map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
  const window = useWindow(task);
  const activeTask = useSystem((state) => state.activeTask);

  return (
    <div
      onClick={
        window.minimized
          ? window.unminimize
          : activeTask === task.id
            ? window.minimize
            : window.focus
      }
      className={cn(styles.task, { [styles.active]: activeTask === task.id })}
    >
      <Icon size={16} name={window.icon} className={styles.icon} />
      <span className={styles.title}>{window.title}</span>
    </div>
  );
};
