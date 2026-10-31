# Finish Parth's photo + social links

Already done: Instagram and LinkedIn links are saved and show in the footer and Contact page; Parth's photo has its background removed and is saved.

Remaining:

1. Show Parth's cut-out portrait on his Founding Team card (round frame, soft dark backdrop, same card size as the others). Members without a photo keep the current text-only layout.
2. Move the photo import to the top of the team data file.
3. Check the Team page on desktop and mobile, confirm the photo shows cleanly and the Instagram/LinkedIn links open the right pages.

## Technical

- `src/routes/team.tsx`: founding card renders `<img src={m.photo} alt="Portrait of {name}" loading="lazy">` when `photo` is set.
- `src/data/team.ts`: hoist `parthPhoto` import above the doc comment.
- Typecheck + Playwright screenshot of /team.
