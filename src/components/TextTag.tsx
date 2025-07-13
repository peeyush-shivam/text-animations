import { memo, useState } from "react";
import type { PathType } from "../types";
import { STYLES } from "../utils/constants";
import { getPathConfig } from "../utils/pathConfig";
import { useAnimation } from "../hooks/useAnimation";

interface TextTagProps {
  text: string;
  pathType: PathType;
}

const TextTag: React.FC<TextTagProps> = memo(({ text, pathType }) => {
  // Each text gets ONE fixed animation type that never changes
  const [path] = useState(() => getPathConfig(pathType));
  const style = useAnimation(path);

  return (
    <span
      style={{
        ...STYLES.TEXT_TAG,
        ...style, // allows animation engine to override positions/dynamics
      }}
    >
      {text}
    </span>
  );
});

export default TextTag;
