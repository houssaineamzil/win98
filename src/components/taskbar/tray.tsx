import { useEffect, useState } from "react";
import { useSystem } from "@/stores/system.store";
import { useTaskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.scss";
import { Icon } from "../icon";
import { Tooltip } from "../tooltip";

export const Tray: React.FC = () => {
  const icons = useTaskbar((state) => state.icons);
  const time = useTaskbar((state) => state.time);
  const settings = useSystem((state) => state.settings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const timeString = mounted
    ? time.toLocaleTimeString(settings.locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: settings.hour12,
        timeZone: settings.timezone,
      })
    : "--:--";

  const fullDateTitle = mounted
    ? time.toLocaleString(settings.locale, {
        weekday: "long",
        month: "long",
        day: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
        hour12: settings.hour12,
        timeZone: settings.timezone,
      })
    : "";

  return (
    <div className={styles.tray}>
      <div className={styles.icons}>
        {icons.map((icon) => (
          <Tooltip key={icon.tooltip || icon.title} content={icon.title}>
            <Icon
              name={icon.icon}
              size={16}
              title={icon.title}
              className={styles.icon}
            />
          </Tooltip>
        ))}
      </div>
      <Tooltip content={fullDateTitle}>
        <div className={styles.time}>{timeString}</div>
      </Tooltip>
    </div>
  );
};
