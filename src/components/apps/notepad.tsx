"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/notepad.module.scss";
import type { MenuBar } from "@/types";

interface NotepadProps {
  onClose?: () => void;
}

// Notepad-specific menus
const getNotepadMenus = (
  handleNew: () => void,
  handleOpen: () => void,
  handleSave: () => void,
  onClose?: () => void,
): MenuBar[] => [
  {
    label: "File",
    hotkey: "F",
    items: [
      { label: "New", hotkey: "N", onClick: handleNew },
      { label: "Open...", hotkey: "O", onClick: handleOpen },
      { label: "Save", hotkey: "S", onClick: handleSave },
      { label: "Save As..." },
      { divider: true, label: "" },
      { label: "Page Setup..." },
      { label: "Print...", hotkey: "P" },
      { divider: true, label: "" },
      { label: "Exit", onClick: onClose },
    ],
  },
  {
    label: "Edit",
    hotkey: "E",
    items: [
      { label: "Undo", hotkey: "U" },
      { divider: true, label: "" },
      { label: "Cut", hotkey: "T" },
      { label: "Copy", hotkey: "C" },
      { label: "Paste", hotkey: "P" },
      { label: "Delete", hotkey: "D" },
      { divider: true, label: "" },
      { label: "Select All", hotkey: "A" },
      { label: "Time/Date", hotkey: "D" },
    ],
  },
  {
    label: "Search",
    hotkey: "S",
    items: [
      { label: "Find...", hotkey: "F" },
      { label: "Find Next", hotkey: "N" },
    ],
  },
  {
    label: "Help",
    hotkey: "H",
    items: [
      { label: "Help Topics" },
      { divider: true, label: "" },
      { label: "About Notepad" },
    ],
  },
];

export const Notepad: React.FC<NotepadProps> = () => {
  const [content, setContent] = useState("");
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNew = useCallback(() => {
    if (isModified) {
      const confirm = window.confirm(
        "The text in the file has changed.\n\nDo you want to save the changes?",
      );
      if (confirm) {
        // Save logic would go here
      }
    }
    setContent("");
    setIsModified(false);
  }, [isModified]);

  const handleOpen = useCallback(() => {
    // File open dialog would go here
    // eslint-disable-next-line no-alert
    window.alert("Open dialog not implemented yet");
  }, []);

  const handleSave = useCallback(() => {
    // File save dialog would go here
    setIsModified(false);
    alert("File saved (simulated)");
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      setIsModified(true);
    },
    [],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "n":
            e.preventDefault();
            handleNew();
            break;
          case "o":
            e.preventDefault();
            handleOpen();
            break;
          case "s":
            e.preventDefault();
            handleSave();
            break;
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
      textarea.focus();
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleNew, handleOpen, handleSave]);

  return (
    <div className={styles.root}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={content}
        onChange={handleChange}
        spellCheck={false}
        autoFocus
      />
    </div>
  );
};

// Export menu generator for use by the window system
export { getNotepadMenus };
