import { create } from "zustand";

interface PinnedApp {
  id: string;
  name: string;
  icon: string;
  component?: string;
  data?: Record<string, unknown>;
  href?: string;
  application?: string;
  tooltip?: string;
}

interface TaskbarState {
	pinned: Array<PinnedApp>;
  icons: Array<{
		id: string;
    icon: string;
    title: string;
		tooltip?: string;
  }>;
  time: Date;
}

export const useTaskbar = create<TaskbarState>(() => ({
  pinned: [
    {
      id: "navigator",
      name: "Navigator",
      icon: "msie1-4",
      component: "InternetExplorer",
      data: { src: "https://www.google.com" },
    },
    {
      id: "outlook",
      name: "Outlook",
      icon: "outlook_express-3",
      component: "InternetExplorer",
      data: { src: "https://outlook.live.com" },
    },
    {
      id: "channels",
      name: "Channels",
      icon: "channels-5",
      component: "InternetExplorer",
      data: { src: "https://www.msn.com" },
    },
    {
      id: "desktop",
      name: "Desktop",
      icon: "desktop_old-4",
      application: "explorer",
    },
  ],
  icons: [
    {
      id: "scheduler",
      icon: "time_and_date-1",
      title: "Task Scheduler is not ready.",
      tooltip: "Task Scheduler is not ready.",
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
