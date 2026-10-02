import { cn } from "@/lib/utils";

/*
  The Compression Skyline — the signature atmospheric element.

  A night scene built from the product's own material: a grid of image
  "tiles" that thin out and resolve into a moon's glow. Rendered entirely
  in SVG + CSS, no image assets, so it stays crisp at any size and adds
  no network weight.

  The tile field is generated from a fixed seed so server and client agree.
*/

type Tile = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

function buildTileField(): Tile[] {
  const tiles: Tile[] = [];
  const columns = 34;
  const rows = 20;
  const cell = 42;
  const moon = { x: 1010, y: 250 };
  const maxDistance = 900;

  let seed = 20260101;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = column * cell + (row % 2 === 0 ? 0 : cell / 2);
      const y = row * cell;
      const distance = Math.hypot(x - moon.x, y - moon.y);
      const proximity = 1 - Math.min(distance / maxDistance, 1);

      // Tiles coalesce near the moon: closer tiles are more present.
      const presence = Math.pow(proximity, 1.8);
      const jitter = rand();

      if (jitter > presence * 1.15) {
        continue;
      }

      tiles.push({
        x,
        y,
        size: 10 + presence * 22,
        opacity: 0.08 + presence * 0.5,
      });
    }
  }

  return tiles;
}

const tileField = buildTileField();

const skyline = [
  { x: 0, w: 120, h: 190 },
  { x: 128, w: 74, h: 120 },
  { x: 210, w: 96, h: 250 },
  { x: 314, w: 62, h: 150 },
  { x: 384, w: 118, h: 300 },
  { x: 510, w: 70, h: 168 },
  { x: 588, w: 104, h: 224 },
  { x: 700, w: 58, h: 138 },
  { x: 766, w: 128, h: 268 },
  { x: 902, w: 72, h: 176 },
  { x: 982, w: 108, h: 312 },
  { x: 1098, w: 66, h: 154 },
  { x: 1172, w: 116, h: 236 },
  { x: 1296, w: 144, h: 186 },
];

export function SkylineScene({ className }: { className?: string }) {
  return (
    <div className={cn("grain absolute inset-0 overflow-hidden", className)}>
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#101826" />
            <stop offset="42%" stopColor="#1b2a3d" />
            <stop offset="78%" stopColor="#2c3d4c" />
            <stop offset="100%" stopColor="#4a5a5c" />
          </linearGradient>

          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdf6e6" stopOpacity="0.95" />
            <stop offset="18%" stopColor="#e8ddc4" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#9fb0b4" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#9fb0b4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="horizon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d8c9a6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#d8c9a6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="skylineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#151d2b" />
            <stop offset="100%" stopColor="#0d131d" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)" />
        <ellipse cx="1010" cy="250" rx="360" ry="360" fill="url(#moonGlow)" />
        <circle cx="1010" cy="250" r="58" fill="#fbf3df" opacity="0.92" />
        <ellipse cx="720" cy="760" rx="820" ry="260" fill="url(#horizon)" />

        <g>
          {tileField.map((tile, index) => (
            <rect
              key={index}
              x={tile.x}
              y={tile.y}
              width={tile.size}
              height={tile.size}
              rx={2}
              fill="#f4ead2"
              opacity={tile.opacity}
            />
          ))}
        </g>

        <g fill="url(#skylineFill)">
          {skyline.map((building) => (
            <rect
              key={building.x}
              x={building.x}
              y={900 - building.h}
              width={building.w}
              height={building.h}
            />
          ))}
        </g>
        <rect y="896" width="1440" height="4" fill="#0b1119" />
      </svg>

      {/* Warm paper wash so text stays legible over the illustration */}
      <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-parchment to-transparent" />
    </div>
  );
}

/*
  A quieter atmospheric band for use as a section divider — a single
  meadow-at-dusk gradient with soft light and grain, no skyline.
*/
export function AtmosphericBand({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-surface border border-mist",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f2a24_0%,#33463a_45%,#5b6b4c_100%)]" />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(240,214,140,0.35),transparent_65%)]" />
      <div className="absolute -bottom-32 -left-16 size-96 rounded-full bg-[radial-gradient(circle,rgba(120,150,120,0.28),transparent_65%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
