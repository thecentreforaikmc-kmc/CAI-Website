/** Pure particle-target sampling for the intro. No DOM / three imports, so it is unit-testable. */

export type PixelSource = { data: Uint8ClampedArray | number[]; width: number; height: number };

export type ParticleSet = {
  count: number;
  /** xyz world positions the particle starts at (always on its own side). */
  source: Float32Array;
  /** xyz world positions the particle settles into (sampled from the plate). */
  target: Float32Array;
  /** rgb 0-1 sampled from the plate, nudged toward the palette. */
  color: Float32Array;
  /** seconds of delay inside its formation phase. */
  delay: Float32Array;
  /** cube size multiplier. */
  scale: Float32Array;
  /** random seed per particle (rotation, wobble). */
  seed: Float32Array;
};

export type SampleOptions = {
  robotCount: number;
  humanCount: number;
  /** plate u (0-1) where the fingertips meet; splits ownership. */
  contactU: number;
  contactV: number;
  /** world width of the plate. */
  worldWidth: number;
  /** luminance 0-1 a pixel needs to count as "hand". */
  threshold?: number;
  seed?: number;
};

/** Mulberry32 — small seeded PRNG so the hands look identical on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Cand = { u: number; v: number; r: number; g: number; b: number; l: number };

export function sampleHands(img: PixelSource, opts: SampleOptions) {
  const threshold = opts.threshold ?? 0.09;
  const rand = mulberry32(opts.seed ?? 20261015);
  const { width, height, data } = img;
  const aspect = width / height;
  const W = opts.worldWidth;
  const H = W / aspect;

  const left: Cand[] = [];
  const right: Cand[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = (data[i] ?? 0) / 255;
      const g = (data[i + 1] ?? 0) / 255;
      const b = (data[i + 2] ?? 0) / 255;
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (l < threshold) continue;
      const u = (x + 0.5) / width;
      const v = (y + 0.5) / height;
      (u < opts.contactU ? left : right).push({ u, v, r, g, b, l });
    }
  }

  const build = (cands: Cand[], count: number, side: -1 | 1): ParticleSet => {
    const n = Math.min(count, cands.length);
    const set: ParticleSet = {
      count: n,
      source: new Float32Array(n * 3),
      target: new Float32Array(n * 3),
      color: new Float32Array(n * 3),
      delay: new Float32Array(n),
      scale: new Float32Array(n),
      seed: new Float32Array(n),
    };
    // Brightness-weighted pick (brighter = more surface detail).
    for (let k = 0; k < n; k++) {
      let c = cands[Math.floor(rand() * cands.length)];
      const alt = cands[Math.floor(rand() * cands.length)];
      if (!c || !alt) continue;
      if (alt.l > c.l) c = alt;
      const jitterX = (rand() - 0.5) / width;
      const jitterY = (rand() - 0.5) / height;
      const tx = (c.u + jitterX - opts.contactU) * W;
      const ty = (opts.contactV - (c.v + jitterY)) * H;
      const tz = (c.l - 0.4) * 0.35 + (rand() - 0.5) * 0.08;
      set.target.set([tx, ty, tz], k * 3);

      // Source: strictly on the owner's side, off-screen-ish.
      const sx = side * (W * 0.55 + rand() * W * 0.45);
      const sy = ty * 0.6 + (rand() - 0.5) * H * 0.9;
      const sz = (rand() - 0.5) * 3;
      set.source.set([sx, sy, sz], k * 3);

      // Toward palette: robot silver/graphite, human keeps skin tone.
      const mix = side < 0 ? 0.45 : 0.15;
      set.color.set(
        [c.r * (1 - mix) + c.l * mix, c.g * (1 - mix) + c.l * mix, c.b * (1 - mix) + c.l * mix * 1.05],
        k * 3,
      );

      // Wrist/palm first, fingertips last: distance from the outer edge.
      const fromOuter = side < 0 ? c.u / opts.contactU : (1 - c.u) / (1 - opts.contactU);
      set.delay[k] = fromOuter * 1.0 + rand() * 0.35;
      set.scale[k] = 0.7 + rand() * 0.6 + (rand() < 0.02 ? 1.2 : 0);
      set.seed[k] = rand();
    }
    return set;
  };

  return {
    robot: build(left, opts.robotCount, -1),
    human: build(right, opts.humanCount, 1),
    worldHeight: H,
  };
}