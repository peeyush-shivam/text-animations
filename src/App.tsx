import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/LandingPage";
import Animation from "./views/Animation";
import { useState, useRef, useCallback, useMemo } from "react";
import type { PathType } from "./types";
import { PATH_TYPES } from "./utils/constants";

function App() {
  const [text, setText] = useState<string[]>([]);
  const animationAssignments = useRef<Map<string, PathType>>(new Map());

  const getRandomPathType = useCallback((): PathType => {
    return PATH_TYPES[Math.floor(Math.random() * PATH_TYPES.length)];
  }, []);

  const getTextAnimation = useCallback(
    (text: string, index: number): PathType => {
      const textKey = `${text}-${index}`;

      // If this text doesn't have an assignment yet, create one
      if (!animationAssignments.current.has(textKey)) {
        animationAssignments.current.set(textKey, getRandomPathType());
      }

      return animationAssignments.current.get(textKey)!;
    },
    [getRandomPathType]
  );

  const handleSetText = useCallback(
    (newText: React.SetStateAction<string[]>) => {
      setText(newText);
    },
    []
  );

  const memoizedText = useMemo(() => text, [text]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage setText={handleSetText} />} />
        <Route
          path="/animation"
          element={
            <Animation
              text={memoizedText}
              getTextAnimation={getTextAnimation}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
