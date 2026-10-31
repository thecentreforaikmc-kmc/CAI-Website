# Cinematic particle-hands loading screen

A full-screen intro that plays when someone opens the site: a robot hand builds itself out of tiny glowing cubes coming in from the left, a human hand builds itself from cubes coming in from the right, the two index fingertips touch in the centre with a soft violet-white pulse, and the scene fades into the CAI seal and then the website. It follows your brief, the four reference images and the video.

## What visitors will see (about 6 seconds)

1. **0–0.8s** Near-black screen, a faint violet glow, a few sparse cubes at the far left and right edges.
2. **0.8–1.8s** Two streams of silver and pale-violet cubes curve inward, the left stream from the left and the right stream from the right. Neither stream ever crosses to the other side.
3. **1.8–3.7s** The left stream forms the robot hand (wrist and palm first, then fingers). At the same time the right stream forms the human hand. The cubes settle, then the solid hand shading fades in under them so both hands look solid.
4. **3.4–4.4s** The two fingers ease slowly toward each other along the same line.
5. **~4.4s** The fingertips touch at the exact centre: a small bright pulse, one ring ripple, a light wave through the background cubes, and a soft reflection on the floor.
6. **4.4–5.3s** A short hold while the background drifts slowly.
7. **5.3–6.0s** The scene fades out. By default it fades to the CAI seal (exact original image, nothing redrawn) and then to the site. A setting also lets it go straight to the site.

## Behaviour

- It plays once per visit (per browser tab session). Moving between pages doesn't replay it.
- A small "Skip intro" button is always visible, and the Esc key also skips.
- The site loads underneath while the intro plays, and the intro never blocks it. If the 3D can't start or takes too long (about 9s), the intro gets out of the way.
- Visitors who have "reduce motion" turned on get a 1-second fade: the still hands image, then the seal.
- Phones get fewer cubes and a lower render resolution so it stays smooth.

## Visual direction

Black background, silver, graphite and smoke-grey cubes with only a little violet. Fine network lines and nodes in the background, a few larger blurred cubes in front for depth, and a dim reflective floor. Strong colour appears only in the seal and in the contact pulse. No lightning, explosions or heavy lens flares.

## Technical details

- **Hand shapes:** I'll generate one clean "plate" image of the two hands meeting fingertip to fingertip, based on your hand references (robot on the left, human on the right, fingertips on the exact centre line, black background). At load time the app samples bright pixels from that image into target points. Points left of centre belong to `robotParticles`, which start offscreen left. Points right of centre belong to `humanParticles`, which start offscreen right. Each point gets a depth value from its brightness. Sampling uses a fixed random seed, so the hands look the same on every load. This is far more reliable than a stand-in 3D hand model, and the same plate becomes the solid hand layer that fades in under the cubes.
- **Rendering:** React Three Fiber with two `InstancedMesh` cube systems (about 6k cubes on desktop, 2.5k on mobile), each with its own buffers for source, target, delay, size and depth. Movement runs on the graphics card in a small custom shader: a curved path with eased progress, little wobble close to the target, and a settle step. Background network and bokeh form a third, separate layer. The contact pulse is a sprite with a ring that scales out. Bloom stays low, with at most one post-processing pass. I'll add `@react-three/postprocessing` only if it stays within budget; otherwise the glow is faked with additive sprites.
- **Files:** `src/components/intro/IntroLoader.tsx` (overlay, timeline, skip, session flag, fallback, configurable `endMode: "logo" | "site"` in `src/data/intro.ts`), `src/components/intro/ParticleHands.tsx` (lazy-loaded scene), `src/components/intro/sampleTargets.ts` (image-to-points with a seeded random generator). Mounted once in `src/routes/__root.tsx` and only after the page has loaded in the browser, so it never runs on the server.
- **Assets:** the generated hands plate is saved under `src/assets/intro/`. The seal reuses the existing logo asset.
- **Checks:** a small test confirms that every robot point starts left of centre and every human point starts right of centre, and that the sampling is deterministic. Playwright screenshots at about 1s, 3s, 4.4s and 6s on desktop and mobile confirm the sequence and that the site appears afterward.
- I'll record the intro architecture rule in `AGENTS.md`.

The uploaded video is used only as a motion reference. It is not embedded in the site.
