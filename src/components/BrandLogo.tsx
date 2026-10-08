import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Bespoke Geometric Brand Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-lg shadow-xs transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02]"
        style={{
          width: iconSize,
          height: iconSize,
          background: 'linear-gradient(135deg, #2D2A26 0%, #1a1816 100%)',
          border: '1px solid rgba(229, 224, 216, 0.4)',
        }}
      >
        <svg
          width={iconSize * 0.65}
          height={iconSize * 0.65}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-1"
        >
          {/* Architectural Layout Blueprint Grid */}
          <rect
            x="3"
            y="3"
            width="26"
            height="26"
            rx="4"
            stroke="#FAF8F5"
            strokeWidth="1.8"
            strokeOpacity="0.85"
            fill="none"
          />
          {/* Digital Column Division Lines */}
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="29"
            stroke="#FAF8F5"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <line
            x1="3"
            y1="12"
            x2="29"
            y2="12"
            stroke="#FAF8F5"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          
          {/* Distinct Interlocking 'P' & 'D' / Notebook Geometry */}
          <path
            d="M8 24V8h6.5a4 4 0 0 1 0 8H8"
            stroke="#FAF8F5"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Focal Terracotta Accent Node (Golden Ratio Intersection) */}
          <circle
            cx="21"
            cy="21"
            r="3.5"
            fill="#D96C4A"
            className="transition-all duration-300 group-hover:fill-[#e07b5a]"
          />
          <circle
            cx="21"
            cy="21"
            r="1.2"
            fill="#FAF8F5"
          />
        </svg>

        {/* Ambient Warm Accent Glow */}
        <span
          className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#D96C4A] ring-2 ring-[#FAF8F5] transition-transform duration-300 group-hover:scale-125"
          title="Active Dispatch"
        />
      </div>

      {/* Brand Wordmark & Optional Subtitle */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-sans font-bold tracking-[-0.03em] text-[#2D2A26] group-hover:text-[#D96C4A] transition-colors ${
              size === 'sm'
                ? 'text-base sm:text-[1.1rem]'
                : size === 'lg'
                ? 'text-xl sm:text-2xl'
                : 'text-[1.2rem] sm:text-[1.3rem]'
            }`}
          >
            Penil's Digital Space
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-[#E5E0D8]/60 text-[#595550] rounded font-semibold group-hover:bg-[#D96C4A]/10 group-hover:text-[#D96C4A] transition-colors">
            NOTEBOOK
          </span>
        </div>

        {showTagline && (
          <span className="font-serif italic text-xs text-[#595550] mt-1 group-hover:text-[#2D2A26] transition-colors">
            Digital Business & Thoughtful Design Notes
          </span>
        )}
      </div>
    </div>
  );
};
