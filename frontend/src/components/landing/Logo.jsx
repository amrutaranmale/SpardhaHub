import React from "react";

// SpardhaHub mark: a stylized "S" formed by a flame/quill arc inside a hexagonal badge.
// Gold + purple gradient strokes on dark navy fill — premium edtech feel.
export default function Logo({ size = 36, withWordmark = false, className = "" }) {
  const uid = React.useId();
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      data-testid="brand-logo"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SpardhaHub logo"
      >
        <defs>
          <linearGradient id={`g-gold-${uid}`} x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#EF9F27" />
            <stop offset="100%" stopColor="#F7C97E" />
          </linearGradient>
          <linearGradient id={`g-pur-${uid}`} x1="0" y1="48" x2="48" y2="0">
            <stop offset="0%" stopColor="#7F77DD" />
            <stop offset="100%" stopColor="#9D96F0" />
          </linearGradient>
        </defs>

        {/* Hex badge */}
        <path
          d="M24 2 L43 12 L43 36 L24 46 L5 36 L5 12 Z"
          fill="#14142a"
          stroke={`url(#g-pur-${uid})`}
          strokeWidth="1.2"
          opacity="0.9"
        />

        {/* Stylized S / flame */}
        <path
          d="M31 14c-3.2-1.6-7.6-1.4-10.4 0.6c-3.2 2.2-3.2 6.6 0.4 8.4c2.2 1.1 5 1.5 7 2.6c2.6 1.4 2.4 4.4-0.4 5.6c-3 1.3-7 0.8-10-1"
          stroke={`url(#g-gold-${uid})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Spark dot */}
        <circle cx="34" cy="14" r="2" fill={`url(#g-gold-${uid})`} />
        <circle cx="34" cy="14" r="4.5" fill={`url(#g-gold-${uid})`} opacity="0.18" />
      </svg>

      {withWordmark && (
        <span className="font-serif-display text-2xl tracking-tight leading-none">
          <span className="text-white">Spardha</span>
          <span className="text-gold-gradient">Hub</span>
        </span>
      )}
    </span>
  );
}
