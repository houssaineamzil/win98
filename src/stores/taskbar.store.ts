import { create } from "zustand";

interface TaskbarState {
  pinned: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  icons: Array<{
    id: string;
    icon: string;
    title: string;
  }>;
  time: Date;
}

export const useTaskbar = create<TaskbarState>(() => ({
  pinned: [
    {
      id: "navigator",
      name: "Navigator",
      icon: "msie1-4",
    },
    {
      id: "outlook",
      name: "Outlook",
      icon: "outlook_express-3",
    },
    {
      id: "channels",
      name: "Channels",
      icon: "channels-5",
    },
    {
      id: "desktop",
      name: "Desktop",
      icon: "desktop_old-4",
    },
  ],
  icons: [
    {
      id: "scheduler",
      icon: "time_and_date-1",
      title: "Task Scheduler is not ready.",
    },
    {
      id: "volume",
      title: "Volume",
      icon: "loudspeaker_rays-1",
    },
  ],
  time: new Date(),
}));

// Time update interval - runs only on client
let intervalId: NodeJS.Timeout | null = null;

export const startTaskbarTimer = () => {
  if (typeof window === "undefined") return;
  if (intervalId) return;

  intervalId = setInterval(() => {
    useTaskbar.setState({ time: new Date() });
  }, 1000); // Update every second (was 10ms which is excessive)
};

export const stopTaskbarTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
