import { ANIMATION_CONFIG } from "./constants";
import type { PathConfig, PathType } from "../types";

export const getPathConfig = (pathType: PathType): PathConfig => {
  const startY =
    Math.random() *
      (ANIMATION_CONFIG.MAX_Y_POSITION - ANIMATION_CONFIG.MIN_Y_POSITION) +
    ANIMATION_CONFIG.MIN_Y_POSITION;
  const endY =
    Math.random() *
      (ANIMATION_CONFIG.MAX_Y_POSITION - ANIMATION_CONFIG.MIN_Y_POSITION) +
    ANIMATION_CONFIG.MIN_Y_POSITION;
  const startX =
    Math.random() < 0.5
      ? -ANIMATION_CONFIG.SPAWN_OFFSET
      : 100 + ANIMATION_CONFIG.SPAWN_OFFSET;
  const endX =
    startX < 0
      ? 100 + ANIMATION_CONFIG.SPAWN_OFFSET
      : -ANIMATION_CONFIG.SPAWN_OFFSET;
  const duration =
    Math.random() *
      (ANIMATION_CONFIG.MAX_DURATION - ANIMATION_CONFIG.MIN_DURATION) +
    ANIMATION_CONFIG.MIN_DURATION;

  switch (pathType) {
    case "bezier":
      return {
        pathType,
        startX,
        startY,
        endX,
        endY,
        duration,
        cp1X: Math.random() * 100,
        cp1Y: Math.random() * 100,
        cp2X: Math.random() * 100,
        cp2Y: Math.random() * 100,
      };

    case "sine":
      return {
        pathType,
        startX,
        startY,
        endX,
        endY,
        duration,
        amplitude:
          Math.random() *
            (ANIMATION_CONFIG.SINE_AMPLITUDE_MAX -
              ANIMATION_CONFIG.SINE_AMPLITUDE_MIN) +
          ANIMATION_CONFIG.SINE_AMPLITUDE_MIN,
        frequency:
          Math.random() *
            (ANIMATION_CONFIG.SINE_FREQUENCY_MAX -
              ANIMATION_CONFIG.SINE_FREQUENCY_MIN) +
          ANIMATION_CONFIG.SINE_FREQUENCY_MIN,
        phase: Math.random() * Math.PI * 2,
        vertical: Math.random() < 0.5,
      };

    case "diagonal":
      return {
        pathType,
        startX,
        startY,
        endX,
        endY,
        duration,
      };

    case "spiral":
      return {
        pathType,
        startX: 50,
        startY: 50,
        endX: 50,
        endY: 50,
        duration,
        spiralRadius:
          Math.random() *
            (ANIMATION_CONFIG.SPIRAL_RADIUS_MAX -
              ANIMATION_CONFIG.SPIRAL_RADIUS_MIN) +
          ANIMATION_CONFIG.SPIRAL_RADIUS_MIN,
        spiralTurns:
          Math.random() *
            (ANIMATION_CONFIG.SPIRAL_TURNS_MAX -
              ANIMATION_CONFIG.SPIRAL_TURNS_MIN) +
          ANIMATION_CONFIG.SPIRAL_TURNS_MIN,
      };

    case "bounce":
      return {
        pathType,
        startX,
        startY,
        endX,
        endY,
        duration,
      };

    case "circle":
      return {
        pathType,
        startX: 50,
        startY: 50,
        endX: 50,
        endY: 50,
        duration,
        circleRadius:
          Math.random() *
            (ANIMATION_CONFIG.CIRCLE_RADIUS_MAX -
              ANIMATION_CONFIG.CIRCLE_RADIUS_MIN) +
          ANIMATION_CONFIG.CIRCLE_RADIUS_MIN,
      };

    case "figure8":
      return {
        pathType,
        startX: 50,
        startY: 50,
        endX: 50,
        endY: 50,
        duration,
        figure8Width:
          Math.random() *
            (ANIMATION_CONFIG.FIGURE8_WIDTH_MAX -
              ANIMATION_CONFIG.FIGURE8_WIDTH_MIN) +
          ANIMATION_CONFIG.FIGURE8_WIDTH_MIN,
        figure8Height:
          Math.random() *
            (ANIMATION_CONFIG.FIGURE8_HEIGHT_MAX -
              ANIMATION_CONFIG.FIGURE8_HEIGHT_MIN) +
          ANIMATION_CONFIG.FIGURE8_HEIGHT_MIN,
      };

    default:
      return {
        pathType: "diagonal",
        startX,
        startY,
        endX,
        endY,
        duration,
      };
  }
};
