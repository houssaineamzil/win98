"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/internet-explorer.module.scss";
import type { MenuBar } from "@/types";

interface InternetExplorerProps {
  initialUrl?: string;
  onClose?: () => void;
}

// Internet Explorer specific menus
const getIEMenus = (onClose?: () => void): MenuBar[] => [
  {
    label: "File",
    hotkey: "F",
    items: [
      { label: "New", hotkey: "N" },
      { label: "Open...", hotkey: "O" },
      { divider: true, label: "" },
      { label: "Close", onClick: onClose },
    ],
  },
  {
    label: "Edit",
    hotkey: "E",
    items: [
      { label: "Cut", hotkey: "T" },
      { label: "Copy", hotkey: "C" },
      { label: "Paste", hotkey: "P" },
    ],
  },
  {
    label: "View",
    hotkey: "V",
    items: [
      { label: "Toolbars" },
      { label: "Status Bar" },
      { divider: true, label: "" },
      { label: "Refresh", hotkey: "R" },
    ],
  },
  {
    label: "Go",
    hotkey: "G",
    items: [
      { label: "Back", hotkey: "B" },
      { label: "Forward", hotkey: "F" },
      { divider: true, label: "" },
      { label: "Home", hotkey: "H" },
      { divider: true, label: "" },
      { label: "Stop", hotkey: "S" },
      { label: "Refresh", hotkey: "R" },
    ],
  },
  {
    label: "Favorites",
    hotkey: "A",
    items: [
      { label: "Add to Favorites..." },
      { label: "Organize Favorites..." },
      { divider: true, label: "" },
      { label: "Google", onClick: () => {} },
      { label: "MSN", onClick: () => {} },
    ],
  },
  {
    label: "Help",
    hotkey: "H",
    items: [
      { label: "Contents and Index" },
      { divider: true, label: "" },
      { label: "About Internet Explorer" },
    ],
  },
];

export const InternetExplorer: React.FC<InternetExplorerProps> = ({
  initialUrl = "https://web.archive.org/web/1998/https://www.google.com/",
  // biome-ignore lint/correctness/noUnusedFunctionParameters: used in menu callback
  onClose,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canGoBack] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = useCallback(() => {
    let targetUrl = inputUrl.trim();

    // Add https:// if no protocol specified
    if (targetUrl && !targetUrl.match(/^https?:\/\//i)) {
      // Check if it's a search query or URL
      if (targetUrl.includes(" ") || !targetUrl.includes(".")) {
        // It's a search - use DuckDuckGo (works in iframes)
        targetUrl = `https://web.archive.org/web/1998/https://www.google.com/?q=${encodeURIComponent(targetUrl)}`;
      } else {
        // It's a URL - add https
        targetUrl = `https://${targetUrl}`;
      }
    }

    setUrl(targetUrl);
    setInputUrl(targetUrl);
    setIsLoading(true);
  }, [inputUrl]);

  const handleGoBack = useCallback(() => {
    iframeRef.current?.contentWindow?.history.back();
  }, []);

  const handleGoForward = useCallback(() => {
    iframeRef.current?.contentWindow?.history.forward();
  }, []);

  const handleStop = useCallback(() => {
    setIsLoading(false);
    // Try to stop loading by setting src to blank
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = "about:blank";
      setTimeout(() => {
        iframe.src = url;
      }, 100);
    }
  }, [url]);

  const handleRefresh = useCallback(() => {
    iframeRef.current?.contentWindow?.location.reload();
  }, []);

  const handleHome = useCallback(() => {
    setInputUrl("https://web.archive.org/web/1998/https://www.google.com/");
    setUrl("https://web.archive.org/web/1998/https://www.google.com/");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        navigate();
      }
    },
    [navigate],
  );

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    // Note: Can't reliably track history state due to cross-origin restrictions
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "l":
            e.preventDefault();
            document.getElementById("ie-address-bar")?.focus();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.navigationButtons}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleGoBack}
            disabled={!canGoBack}
            title="Back"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleGoForward}
            disabled
            title="Forward"
          >
            →
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={isLoading ? handleStop : handleRefresh}
            title={isLoading ? "Stop" : "Refresh"}
          >
            {isLoading ? "✕" : "↻"}
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleHome}
            title="Home"
          >
            🏠
          </button>
        </div>
        <div className={styles.addressBar}>
          <span className={styles.label}>Address</span>
          <input
            id="ie-address-bar"
            type="text"
            className={styles.input}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className={styles.goButton} onClick={navigate}>
            Go
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {hasError ? (
          <div className={styles.errorPage}>
            <p>Cannot display the webpage.</p>
            <p>
              The website refused to connect or does not allow embedding in
              frames.
            </p>
            <button
              type="button"
              onClick={() => {
                window.open(url, "_blank");
              }}
              className={styles.openExternalButton}
            >
              Open in New Tab
            </button>
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                navigate();
              }}
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={url}
            className={styles.iframe}
            onLoad={handleLoad}
            onError={handleError}
            title="Internet Explorer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
};

export { getIEMenus };
