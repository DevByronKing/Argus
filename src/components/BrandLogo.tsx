'use client';

import React, { useEffect, useState } from 'react';

export type BrandLogoVariantId = 'aegis-prism' | 'precision-compass' | 'swiss-iris' | 'falcon-wings' | 'carbon-hexa';

export interface BrandLogoConcept {
  id: BrandLogoVariantId;
  number: number;
  name: string;
  shortName: string;
  tagline: string;
  colors: string;
  imageUrl: string;
}

export const BRAND_LOGO_CONCEPTS: BrandLogoConcept[] = [
  {
    id: 'aegis-prism',
    number: 1,
    name: 'Prisma Aegis (Monograma A)',
    shortName: '1. Prisma Aegis',
    tagline: 'Escudo facetado de alta precisão com monograma A arquitetônico',
    colors: 'Safira Real, Índigo & Ciano',
    imageUrl: '/logos/logo-1-aegis.png',
  },
  {
    id: 'precision-compass',
    number: 2,
    name: 'Bússola Tática 80/20',
    shortName: '2. Bússola 80/20',
    tagline: 'Estrela polar de 4 pontas com retículo cirúrgico de mira',
    colors: 'Azul Cobalto & Ciano Elétrico',
    imageUrl: '/logos/logo-2-compass.png',
  },
  {
    id: 'swiss-iris',
    number: 3,
    name: 'Lente Suíça Minimalista',
    shortName: '3. Lente Suíça',
    tagline: 'Visão onisciente em curvas contínuas com núcleo de diamante',
    colors: 'Safira Profundo, Violeta & Turquesa',
    imageUrl: '/logos/logo-3-iris.png',
  },
  {
    id: 'falcon-wings',
    number: 4,
    name: 'Asas de Falcão (Voo 80/20)',
    shortName: '4. Asas Falcão',
    tagline: 'Monograma A ascendente simbolizando velocidade e aprovação',
    colors: 'Azul Royal & Esmeralda-Ciano',
    imageUrl: '/logos/logo-4-falcon.png',
  },
  {
    id: 'carbon-hexa',
    number: 5,
    name: 'Cubo Quântico Carbon',
    shortName: '5. Cubo Carbon',
    tagline: 'Hexágono isométrico multidimensional inspirado no Gemini 4 Carbon',
    colors: 'Índigo Carbon, Safira & Ciano',
    imageUrl: '/logos/logo-5-carbon.png',
  },
];

export const STORAGE_LOGO_KEY = 'argus_brand_logo_variant';

export function getSavedLogoVariant(): BrandLogoVariantId {
  if (typeof window === 'undefined') return 'aegis-prism';
  try {
    const saved = localStorage.getItem(STORAGE_LOGO_KEY) as BrandLogoVariantId | null;
    if (saved && BRAND_LOGO_CONCEPTS.some((c) => c.id === saved)) {
      return saved;
    }
  } catch {}
  return 'aegis-prism';
}

export function setSavedLogoVariant(variant: BrandLogoVariantId): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_LOGO_KEY, variant);
    window.dispatchEvent(new CustomEvent('argus-logo-changed', { detail: variant }));
  } catch {}
}

interface BrandLogoProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
  variant?: BrandLogoVariantId;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  className = '',
  showGlow = false,
  variant: propVariant,
}) => {
  const [activeVariant, setActiveVariant] = useState<BrandLogoVariantId>(propVariant || 'aegis-prism');

  useEffect(() => {
    if (propVariant) {
      setActiveVariant(propVariant);
      return;
    }
    setActiveVariant(getSavedLogoVariant());

    const handleLogoChange = (e: Event) => {
      const customEvent = e as CustomEvent<BrandLogoVariantId>;
      if (customEvent.detail) {
        setActiveVariant(customEvent.detail);
      } else {
        setActiveVariant(getSavedLogoVariant());
      }
    };

    window.addEventListener('argus-logo-changed', handleLogoChange);
    return () => window.removeEventListener('argus-logo-changed', handleLogoChange);
  }, [propVariant]);

  const currentConcept =
    BRAND_LOGO_CONCEPTS.find((c) => c.id === activeVariant) || BRAND_LOGO_CONCEPTS[0];

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={`Logo Argus AI — ${currentConcept.name}`}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(6,182,212,0.22) 55%, transparent 75%)',
            filter: 'blur(12px)',
            transform: 'scale(1.28)',
          }}
        />
      )}
      <div className="relative w-full h-full flex items-center justify-center group transition-transform duration-300 hover:scale-105">
        <img
          src={currentConcept.imageUrl}
          alt={currentConcept.name}
          width={size}
          height={size}
          className="w-full h-full object-contain drop-shadow-[0_3px_10px_rgba(37,99,235,0.22)]"
          loading="eager"
          decoding="sync"
        />
      </div>
    </div>
  );
};

export default BrandLogo;
