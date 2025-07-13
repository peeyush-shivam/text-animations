import forestBg from "../assets/forest.png";

import { useNavigate } from "react-router-dom";
import { AiOutlineEnter } from "react-icons/ai";
import { useState, useCallback, memo } from "react";
import { ANIMATION_CONFIG } from "../utils/constants";

type LandingPageProps = {
  setText: React.Dispatch<React.SetStateAction<string[]>>;
};

const LandingPage: React.FC<LandingPageProps> = memo(({ setText }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        setText((prev) => {
          const updated = [...prev, inputValue.trim()];
          return updated.length > ANIMATION_CONFIG.MAX_TEXT_ITEMS
            ? updated.slice(1)
            : updated;
        });
        setInputValue("");
        navigate("/animation");
      }
    },
    [inputValue, setText, navigate]
  );

  const handleAnimateClick = useCallback(() => {
    if (inputValue.trim() !== "") {
      setText((prev) => {
        const updated = [...prev, inputValue.trim()];
        return updated.length > ANIMATION_CONFIG.MAX_TEXT_ITEMS
          ? updated.slice(1)
          : updated;
      });
      setInputValue("");
      navigate("/animation");
    }
  }, [inputValue, setText, navigate]);

  return (
    <div
      className="w-full h-screen flex justify-center items-center p-4"
      style={{
        backgroundImage: `url(${forestBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
        <p className="text-6xl md:text-8xl text-[#1f3e2d] text-left">ENTER</p>
        <div className="relative w-full">
          <input
            className="w-full h-12 bg-[#8ca3a3]/50 pl-3 pr-14 rounded-md outline-none caret-[#1f3e2d] focus:outline-none focus:ring-0 focus:border-none shadow-md font-mono text-[#1f3e2d] placeholder-[#1f3e2d]/70 text-base md:text-lg"
            placeholder="Type your phrase..."
            autoFocus
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={inputValue}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1f3e2d] text-sm opacity-70 select-none pointer-events-none font-mono">
            <AiOutlineEnter size={22} />
          </span>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="sm:w-auto w-full bg-[#1f3e2d] font-mono text-[#8ca3a3] px-6 py-3 rounded-md shadow-md hover:bg-[#1f3e2d]/80 transition-colors duration-300 cursor-pointer text-base md:text-sm"
            onClick={handleAnimateClick}
          >
            Animate
          </button>
        </div>
      </div>
    </div>
  );
});

export default LandingPage;
