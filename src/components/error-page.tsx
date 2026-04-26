"use client";

import { useEffect } from "react";
import styles from "@/styles/components/error-page.module.scss";
import { playErrorSound } from "@/utils/sounds";
import { Button } from "./button";

interface ErrorPageProps {
  componentName: string;
  onClose?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  componentName,
  onClose,
}) => {
  useEffect(() => {
    playErrorSound();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.icon}>⚠️</div>
      <div className={styles.message}>
        <p>Cannot find the application &quot;{componentName}&quot;.</p>
        <p>Windows cannot find this program.</p>
      </div>
      <div className={styles.actions}>
        <Button onClick={onClose}>OK</Button>
      </div>
    </div>
  );
};
