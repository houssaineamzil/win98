"use client";

import { useMemo } from "react";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.scss";
import { cn } from "@/utils";
import { Window } from "../window";
import { View } from "./View";
import { Wallpaper } from "./wallpaper";

interface DesktopProps {
  className?: string;
}

export const Desktop: React.FC<DesktopProps> = ({ className }) => {
  // Use selector to only subscribe to tasks changes
  const tasks = useSystem((state) => state.tasks);

  // Derive windows array directly - no need for useState/useEffect
  const windows = useMemo(() => Object.values(tasks), [tasks]);

  return (
    <div id="desktop" className={cn(styles.root, className)}>
      <Wallpaper />
      <View />
      {windows.map((task, index) => (
        <Window key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};
