import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "h-8 w-8", showText = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Logo Icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-emerald-400 opacity-20 blur-lg"></div>
        <svg 
          className={`relative ${className}`} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rounded Square Background */}
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="10"
            stroke="url(#logo-gradient)"
            strokeWidth="3.5"
            fill="none"
          />
          
          {/* Growth Chart Line */}
          <path
            d="M14 32 L20 26 L28 20 L34 14"
            stroke="url(#logo-gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Data Points */}
          <circle cx="14" cy="32" r="3" fill="url(#logo-gradient)" />
          <circle cx="20" cy="26" r="3" fill="url(#logo-gradient)" />
          <circle cx="28" cy="20" r="3" fill="url(#logo-gradient)" />
          <circle cx="34" cy="14" r="3.5" fill="url(#logo-gradient)" />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient 
              id="logo-gradient" 
              x1="4" 
              y1="4" 
              x2="44" 
              y2="44" 
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Brand Name */}
      {showText && (
        <div className="text-[18px] font-bold text-slate-50">Stabi</div>
      )}
    </div>
  );
}
