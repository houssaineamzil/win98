import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/tooltip.module.scss";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

interface TooltipPosition {
  x: number;
  y: number;
  transform: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    transform: "translateX(-50%)",
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipSizeRef = useRef({ width: 0, height: 0 });

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    // Update ref for next calculation
    tooltipSizeRef.current = { width: tooltipWidth, height: tooltipHeight };

    const margin = 6;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default: center horizontally on trigger, show below
    let x = rect.left + rect.width / 2;
    let y = rect.bottom + margin;
    let transform = "translateX(-50%)";

    // Check vertical space - flip to top if not enough bottom space
    const spaceBelow = viewportHeight - rect.bottom;
    if (
      spaceBelow < tooltipHeight + margin &&
      rect.top > tooltipHeight + margin
    ) {
      y = rect.top - tooltipHeight - margin;
    }

    // Check horizontal space and adjust
    const halfWidth = tooltipWidth / 2;
    const rightEdge = x + halfWidth;
    const leftEdge = x - halfWidth;

    // If overflow on right, align to right edge of viewport
    if (rightEdge > viewportWidth - margin) {
      x = viewportWidth - tooltipWidth - margin;
      transform = "none";
    }
    // If overflow on left, align to left edge
    else if (leftEdge < margin) {
      x = margin;
      transform = "none";
    }

    setPosition({ x, y, transform });
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [isVisible, calculatePosition]);

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-flex" }}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={styles.root}
          style={{
            left: position.x,
            top: position.y,
            transform: position.transform,
          }}
        >
          <div className={styles.content}>{content}</div>
        </div>
      )}
    </>
  );
};
