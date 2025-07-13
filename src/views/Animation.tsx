import Particles from "react-tsparticles";
import TextTag from "../components/TextTag";
import forestBg from "../assets/forest.png";

import { loadSlim } from "tsparticles-slim";
import { useNavigate } from "react-router-dom";
import type { TextAnimation } from "../types";
import { useCallback, useMemo, memo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { particlesConfig } from "../utils/particlesConfig";
import type { Container, Engine } from "tsparticles-engine";

type AnimationProps = {
  text: string[];
  getTextAnimation: (text: string, index: number) => string;
};

const Animation: React.FC<AnimationProps> = memo(
  ({ text, getTextAnimation }) => {
    const navigate = useNavigate();

    const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(
      async (container: Container | undefined) => {
        console.log("Particles loaded", container);
      },
      []
    );

    const handleNavigateBack = useCallback(() => {
      navigate("/");
    }, [navigate]);

    // Create animation assignments using the function from parent
    const textAnimations = useMemo((): TextAnimation[] => {
      return text.map((t, index) => {
        const textKey = `${t}-${index}`;

        return {
          text: t,
          pathType: getTextAnimation(t, index) as any,
          id: textKey,
        };
      });
    }, [text, getTextAnimation]);

    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black overflow-hidden">
        <div
          className="aspect-video w-full max-w-[100vw] max-h-[100vh] bg-cover bg-center overflow-hidden relative"
          style={{ backgroundImage: `url(${forestBg})` }}
        >
          <button
            onClick={handleNavigateBack}
            className="absolute top-4 left-4 z-20 bg-[#1f3e2d]/80 hover:bg-[#1f3e2d] text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
            title="Go back to add more text"
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          <Particles
            className="absolute inset-0"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
          />
          {/* Floating text animations */}
          {textAnimations.map((textAnim) => (
            <TextTag
              key={textAnim.id}
              text={textAnim.text}
              pathType={textAnim.pathType}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default Animation;
