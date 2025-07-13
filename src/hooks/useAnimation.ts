import { useCallback, useRef, useState, useEffect } from "react";
import type { PathConfig } from "../types";
import { ANIMATION_CONFIG } from "../utils/constants";

export const useAnimation = (path: PathConfig) => {
  const [style, setStyle] = useState({ left: "0%", top: "0%" });
  const [startTime, setStartTime] = useState(() => Date.now());
  const requestRef = useRef<number | null>(null);
  const runningRef = useRef(true);

  const calculatePosition = useCallback(
    (t: number): { x: number; y: number } => {
      let x: number, y: number;

      switch (path.pathType) {
        case "bezier": {
          const {
            startX,
            startY,
            endX,
            endY,
            cp1X = 0,
            cp1Y = 0,
            cp2X = 0,
            cp2Y = 0,
          } = path;
          x =
            Math.pow(1 - t, 3) * startX +
            3 * Math.pow(1 - t, 2) * t * cp1X +
            3 * (1 - t) * Math.pow(t, 2) * cp2X +
            Math.pow(t, 3) * endX;
          y =
            Math.pow(1 - t, 3) * startY +
            3 * Math.pow(1 - t, 2) * t * cp1Y +
            3 * (1 - t) * Math.pow(t, 2) * cp2Y +
            Math.pow(t, 3) * endY;
          break;
        }
        case "sine": {
          const {
            startX,
            startY,
            endX,
            endY,
            amplitude = 0,
            frequency = 1,
            phase = 0,
            vertical = false,
          } = path;
          if (vertical) {
            x =
              startX +
              (endX - startX) * t +
              Math.sin(t * Math.PI * frequency + phase) * amplitude;
            y = startY + (endY - startY) * t;
          } else {
            x = startX + (endX - startX) * t;
            y =
              startY +
              (endY - startY) * t +
              Math.sin(t * Math.PI * frequency + phase) * amplitude;
          }
          break;
        }
        case "diagonal": {
          const { startX, startY, endX, endY } = path;
          x = startX + (endX - startX) * t;
          y = startY + (endY - startY) * t;
          break;
        }
        case "spiral": {
          const {
            startX = 50,
            startY = 50,
            spiralTurns = 1,
            spiralRadius = 30,
          } = path;
          const angle = 2 * Math.PI * spiralTurns * t;
          const radius = spiralRadius * t;
          x = startX + Math.cos(angle) * radius;
          y = startY + Math.sin(angle) * radius;
          break;
        }
        case "bounce": {
          const { startX, startY, endX, endY } = path;
          x = startX + (endX - startX) * t;
          y =
            startY +
            (endY - startY) * t -
            ANIMATION_CONFIG.BOUNCE_AMPLITUDE * Math.abs(Math.sin(Math.PI * t));
          break;
        }
        case "circle": {
          const { startX = 50, startY = 50, circleRadius = 25 } = path;
          const angle = 2 * Math.PI * t;
          x = startX + Math.cos(angle) * circleRadius;
          y = startY + Math.sin(angle) * circleRadius;
          break;
        }
        case "figure8": {
          const {
            startX = 50,
            startY = 50,
            figure8Width = 35,
            figure8Height = 25,
          } = path;
          const angle = 2 * Math.PI * t;
          x = startX + figure8Width * Math.sin(angle);
          y = startY + figure8Height * Math.sin(angle) * Math.cos(angle);
          break;
        }
        default: {
          const { startX, startY, endX, endY } = path;
          x = startX + (endX - startX) * t;
          y = startY + (endY - startY) * t;
        }
      }

      return { x, y };
    },
    [path]
  );

  const animate = useCallback(() => {
    if (!runningRef.current) return;

    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const t = Math.min(elapsed / path.duration, 1);

    const { x, y } = calculatePosition(t);

    setStyle({
      left: `${x}%`,
      top: `${y}%`,
    });

    if (t < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Restart animation
      setStartTime(Date.now());
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [startTime, path.duration, calculatePosition]);

  useEffect(() => {
    runningRef.current = true;
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      runningRef.current = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return style;
};
