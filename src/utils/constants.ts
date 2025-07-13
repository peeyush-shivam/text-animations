import type { PathType } from "../types";

export const ANIMATION_CONFIG = {
  MAX_TEXT_ITEMS: 5,
  MIN_DURATION: 8,
  MAX_DURATION: 12,
  MIN_Y_POSITION: 10,
  MAX_Y_POSITION: 80,
  SPAWN_OFFSET: 20,
  SINE_AMPLITUDE_MIN: 10,
  SINE_AMPLITUDE_MAX: 40,
  SINE_FREQUENCY_MIN: 1,
  SINE_FREQUENCY_MAX: 3,
  SPIRAL_RADIUS_MIN: 20,
  SPIRAL_RADIUS_MAX: 60,
  SPIRAL_TURNS_MIN: 1,
  SPIRAL_TURNS_MAX: 3,
  CIRCLE_RADIUS_MIN: 20,
  CIRCLE_RADIUS_MAX: 50,
  FIGURE8_WIDTH_MIN: 30,
  FIGURE8_WIDTH_MAX: 70,
  FIGURE8_HEIGHT_MIN: 20,
  FIGURE8_HEIGHT_MAX: 50,
  BOUNCE_AMPLITUDE: 20,
} as const;

export const PATH_TYPES: PathType[] = [
  "bezier",
  "sine",
  "diagonal",
  "spiral",
  "bounce",
  "circle",
  "figure8",
];

export const STYLES = {
  TEXT_TAG: {
    position: "absolute" as const,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none" as const,
    zIndex: 10,
    whiteSpace: "nowrap" as const,
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))",
    color: "#1f3e2d",
    padding: "10px 18px",
    borderRadius: "25px",
    fontSize: "1.2rem",
    letterSpacing: "0.5px",
    boxShadow:
      "0 8px 32px rgba(11, 38, 23, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
} as const;
