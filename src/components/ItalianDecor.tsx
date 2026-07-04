/**
 * Shared luxury-Italian decorative elements used across dark sections
 * (Hero, Statistics): a green/olive branch and a faint marble-vein texture.
 */

/** Elegant hand-drawn olive branch — decorative, green→olive stroke. */
export const OliveBranch = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 120" fill="none" className={className} aria-hidden="true">
    <path
      d="M8 60 C60 52 120 50 192 40"
      stroke="url(#oliveStroke)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {[
      [40, 55, -28],
      [70, 52, 26],
      [100, 49, -26],
      [130, 46, 24],
      [160, 43, -22],
    ].map(([x, y, rot], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
        <ellipse cx="0" cy="-9" rx="6.5" ry="12" fill="url(#oliveLeaf)" opacity="0.9" />
      </g>
    ))}
    {[52, 88, 118, 148].map((x, i) => (
      <circle key={i} cx={x} cy={i % 2 ? 58 : 40} r="3.4" fill="#CD212A" opacity="0.75" />
    ))}
    <defs>
      <linearGradient id="oliveStroke" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#F8F5F0" />
        <stop offset="1" stopColor="#A6C79A" />
      </linearGradient>
      <linearGradient id="oliveLeaf" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A6C79A" />
        <stop offset="1" stopColor="#6B8E5A" />
      </linearGradient>
    </defs>
  </svg>
);

/** Faint marble-vein texture as an inline SVG data URI (low-opacity overlay). */
export const MARBLE_VEINS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Cg fill='none' stroke='%23F8F5F0' stroke-width='1'%3E%3Cpath d='M-50 180 C250 90 450 300 720 200 950 120 1100 260 1300 210'/%3E%3Cpath d='M-50 360 C220 300 420 470 680 380 940 300 1120 430 1300 400'/%3E%3Cpath d='M-50 560 C280 500 460 640 700 560 980 470 1140 610 1300 580'/%3E%3Cpath d='M120 -40 C180 220 60 460 200 700 300 860 240 900 260 900' opacity='0.5'/%3E%3Cpath d='M620 -40 C700 240 560 480 720 760' opacity='0.4'/%3E%3Cpath d='M1020 -40 C1080 260 940 500 1080 800' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E\")";
