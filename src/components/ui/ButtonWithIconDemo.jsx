import React from "react";

export const ButtonWithIconDemo = ({ onClick, text = "Connect" }) => {
  return (
    <>
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }
      `}</style>
      <button 
        onClick={onClick}
        className="relative z-40 h-[40px] px-8 cursor-pointer rounded-full p-px text-[12px] font-semibold text-white group outline-none overflow-hidden inline-block"
      >
        <span className="absolute inset-0 rounded-full bg-slate-800" />
        
        {/* Button Interior */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-zinc-950 px-6 ring-1 ring-[#ffffff15] transition-all duration-700 bg-[linear-gradient(110deg,#09090b,45%,#27272a,55%,#09090b)] animate-shine hover:ring-white/30">
          
          <span className="text-[11px] uppercase tracking-[0.2em] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-white to-zinc-400 relative z-10 transition-colors duration-500 group-hover:text-white">
            {text}
          </span>
          
        </div>
      </button>
    </>
  );
};
