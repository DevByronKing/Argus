'use client';

import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  className = '',
  showGlow = false,
}) => {
  const logoSrc = '/argus-iris-circle.webp';

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center select-none rounded-full ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label="Logo Argus — A Lente Cognitiva da Aprovação"
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(99,102,241,0.28) 50%, transparent 72%)',
            filter: 'blur(14px)',
            transform: 'scale(1.28)',
          }}
        />
      )}
      <div className="relative w-full h-full overflow-hidden rounded-full shadow-md shadow-cyan-500/20 flex items-center justify-center group">
        <img
          src={logoSrc}
          alt="Argus Logo — Íris Neural"
          width={size}
          height={size}
          className="w-full h-full object-contain rounded-full transform group-hover:scale-105 transition-transform duration-500"
          loading="eager"
          decoding="sync"
        />
      </div>
    </div>
  );
};

export default BrandLogo;
