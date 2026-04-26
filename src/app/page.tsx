"use client";

import type { NextPage } from "next";
import { useEffect } from "react";

import { Desktop } from "@/components/desktop";
import { Taskbar } from "@/components/taskbar";
import { WindowSwitcher } from "@/components/window-switcher";
import { startTaskbarTimer, stopTaskbarTimer } from "@/stores/taskbar.store";

const preventContextMenu = (event: MouseEvent) => event.preventDefault();

const Page: NextPage = () => {
  useEffect(() => {
    // Start taskbar timer on mount
    startTaskbarTimer();

    // Prevent context menu (right click)
    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      stopTaskbarTimer();
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  return (
    <>
      <Desktop />
      <Taskbar />
      <WindowSwitcher />
    </>
  );
};

export default Page;
