# Premium targeting cursor

Add the React Bits TargetCursor across the whole site, tuned to the CAI look: thin electric-blue brackets that slowly rotate while roaming, then snap and lock around buttons, links, cards and team tiles with a soft violet glow and a small mono label.

## What you will see

- Desktop only (mouse/trackpad). Phones and tablets keep normal touch behaviour.
- Roaming: slow 4s spin, slim 2px brackets, tiny centre dot.
- On hover: brackets glide onto the element, follow its rounded corners, lean slightly toward the pointer, and show a short label ("Open", "Join", "Send", "View").
- Click: brackets squeeze briefly.
- Hidden during the cube-hands intro; appears once the site is shown.
- Respects reduced-motion (no spin, instant snapping).

## Targets

Navbar links + logo, all main buttons, project cards, team cards, form submit buttons, footer social links.

## Technical details

- `src/components/TargetCursor.tsx` + `TargetCursor.css`: the supplied component source, typed for TS, colours via theme tokens (`--primary`, `--violet`) instead of hardcoded hex.
- Mount once in `src/routes/__root.tsx` after hydration; settings: spinDuration 4, thickness 2, cornerSize 10, padding 8, blendMode normal, cursorColorOnTarget violet.
- Add `cursor-target` class and `data-cursor-label` to the elements listed above.
- Suppressed while the intro overlay is open (intro sets a body attribute the cursor checks).
