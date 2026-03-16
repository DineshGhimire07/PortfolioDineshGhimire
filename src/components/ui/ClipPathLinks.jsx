import React from "react";
import {
  SiGoogle,
  SiGooglescholar,
} from "react-icons/si";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const ClipPathLinks = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-3">
        <LinkBox 
          Icon={SiGoogle} 
          href="mailto:ghimiredinesh221@gmail.com" 
          label="Email"
        />
        <LinkBox 
          Icon={Github} 
          href="https://github.com/DineshGhimire07" 
          label="GitHub"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <LinkBox 
          Icon={Linkedin} 
          href="https://www.linkedin.com/in/dineshghimire/" 
          label="LinkedIn"
        />
        <LinkBox 
          Icon={Instagram} 
          href="https://www.instagram.com/dineshghimirea/" 
          label="Instagram"
        />
        <LinkBox 
          Icon={Facebook} 
          href="https://www.facebook.com/Dineshghimire07" 
          label="Facebook"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LinkBox 
          Icon={SiGooglescholar} 
          href="https://scholar.google.com/citations?hl=en&user=Ax8Zl2wAAAAJ" 
          label="Scholar"
        />
        <LinkBox 
          Icon={ExternalLink} 
          href="https://ghimire-dinesh.com.np" 
          label="Portfolio"
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, imgSrc, className, label }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-24 w-full place-content-center sm:h-32 md:h-44 text-white hover:text-white bg-black group border border-zinc-800/50 hover:border-zinc-700 transition-colors"
    >
      <div className="flex flex-col items-center gap-2">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={label}
            className={cn("max-h-12 sm:max-h-16 md:max-h-20 object-contain", className)}
          />
        ) : (
          <Icon className="text-2xl sm:text-4xl md:text-5xl" />
        )}
        <span className="text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </div>

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white text-black transition-colors duration-300"
      >
        <div className="flex flex-col items-center gap-2">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={`${label} hover`}
              className={cn("max-h-12 sm:max-h-16 md:max-h-20 object-contain brightness-0", className)}
            />
          ) : (
            <Icon className="text-2xl sm:text-4xl md:text-5xl" />
          )}
          <span className="text-[10px] uppercase tracking-widest font-bold">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
};
