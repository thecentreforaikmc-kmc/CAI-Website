<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Mount the intro once in the shared root, and lazy-load its browser-only scene after hydration; this keeps navigation session-only and avoids server-side WebGL.
- Sample seeded particle targets from the bundled hand plate and animate instanced cubes with shader uniforms; this preserves hand detail within the mobile rendering budget.
- Derive all hand shader stage boundaries from the shared intro timeline; this prevents formation, contact and seal fades from drifting apart when pacing changes.
