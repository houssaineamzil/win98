// Imports
import Image from "next/image";

// Styles
import styles from "_styles/components/taskbar/pinned.module.scss";

// Images
import desktop from "_assets/icons/desktop.png";
import navigator from "_assets/icons/navigator.png";
import outlook from "_assets/icons/outlook.png";

// Types

// Logic

export const Pinned = () => {
  const apps = [
    {
      name: "Desktop",
      icon: desktop,
      tooltip: "Show Desktop",
    },
    {
      name: "Internet Explorer",
      icon: navigator,
      tooltip: "Launch Internet Explorer Browser",
    },
    {
      name: "Outlook",
      icon: outlook,
      tooltip: "Launch Outlook Express",
    },
  ];
  return (
    <div className={styles.pinned}>
      {apps.map((app) => {
        return (
          <button key={app.name} className={styles.pinnedApp}>
            <Image
              src={app.icon}
              className={styles.icon}
              alt={`${app.name} icon`}
            />
          </button>
        );
      })}
    </div>
  );
};
