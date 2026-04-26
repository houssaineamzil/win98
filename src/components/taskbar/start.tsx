"use client";

import { useState } from "react";
import styles from "@/styles/components/taskbar.module.scss";
import { Button } from "../button";
import { Icon } from "../icon";
import { StartMenu } from "./start-menu";

export const Start: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={styles.startWrapper}>
      <Button
        className={styles.start}
        title="Click here to begin."
        onClick={toggleMenu}
        data-active={isMenuOpen}
      >
        <Icon name="windows-3" size={16} />
        <b>Start</b>
      </Button>
      <StartMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
};
