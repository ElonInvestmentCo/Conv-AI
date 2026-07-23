/**
 * Single source of truth for the Conv AI logo mark.
 *
 * variant="auto"   — fill adapts to the active theme:
 *                    dark  → #F8FAFC (white)
 *                    light → #0F172A (near-black)
 *
 * variant="brand"  — always accent-indigo (#6366F1). Used for the AI
 *                    avatar in chat and the welcome-screen icon where the
 *                    accent colour is intentional regardless of theme.
 *
 * Pass `size` for an explicit pixel square, OR `className` for Tailwind
 * sizing (e.g. className="w-[30px] h-[30px]"). Do not pass both.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoMarkProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** 'auto' adapts to theme; 'brand' is always accent-indigo. Default: 'auto' */
  variant?: 'auto' | 'brand';
}

export function LogoMark({ size, className, style, variant = 'auto' }: LogoMarkProps) {
  const { resolvedTheme } = useTheme();

  const fill =
    variant === 'brand'
      ? '#6366F1'
      : resolvedTheme === 'light'
        ? '#0F172A'
        : '#F8FAFC';

  const secondOpacity = variant === 'brand' ? 0.55 : 0.5;

  const computedStyle: React.CSSProperties | undefined = size
    ? { flexShrink: 0, ...style }
    : style;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(size ? { width: size, height: size } : {})}
      className={className}
      style={computedStyle}
    >
      <path
        d="M6 10C6 7.79086 7.79086 6 10 6H16V18C16 22.4183 12.4183 26 8 26H6V10Z"
        fill={fill}
      />
      <path
        d="M26 22C26 24.2091 24.2091 26 22 26H16V14C16 9.58172 19.5817 6 24 6H26V22Z"
        fill={fill}
        fillOpacity={secondOpacity}
      />
    </svg>
  );
}
