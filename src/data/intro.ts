/** Intro loader settings — change here without touching the animation. */
export const intro = {
  enabled: true,
  /** "logo": hands fade into the CAI seal, then the site. "site": straight to the site. */
  endMode: "logo" as "logo" | "site",
  /** Play once per browser-tab session. */
  oncePerSession: true,
  /** Hard ceiling: the intro always gets out of the way by this time (ms). */
  maxDurationMs: 12000,
  /** Gentle exit, shared by the overlay transition and its cleanup timer. */
  exitDurationMs: 850,
  /** Plate u/v (0-1) where the fingertips meet in hands-plate.jpg. */
  contactU: 0.529,
  contactV: 0.443,
  /** Optional ambient reference clip played faintly behind the scene. */
  videoSrc: "/video/intro-reference.mp4" as string | undefined,
};

/** Timeline (seconds). */
export const T = {
  robotStart: 0.9,
  humanStart: 1.1,
  formDuration: 2.1,
  plateIn: [3.4, 4.6] as const,
  approach: [4.2, 5.7] as const,
  contact: 5.7,
  sceneOut: 6.7,
  end: 8.3,
};
