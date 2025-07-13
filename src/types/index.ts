export type PathType =
  | "bezier"
  | "sine"
  | "diagonal"
  | "spiral"
  | "bounce"
  | "circle"
  | "figure8";

export interface PathConfig {
  pathType: PathType;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  // Bezier
  cp1X?: number;
  cp1Y?: number;
  cp2X?: number;
  cp2Y?: number;
  // Sine
  amplitude?: number;
  frequency?: number;
  phase?: number;
  vertical?: boolean;
  // Spiral
  spiralRadius?: number;
  spiralTurns?: number;
  // Circle
  circleRadius?: number;
  // Figure 8
  figure8Width?: number;
  figure8Height?: number;
}

export interface TextAnimation {
  text: string;
  pathType: PathType;
  id: string;
}
