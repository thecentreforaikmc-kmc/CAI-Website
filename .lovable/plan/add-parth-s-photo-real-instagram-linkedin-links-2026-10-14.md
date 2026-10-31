# Add Parth's photo + real Instagram/LinkedIn links

## 1. Update social links (src/data/site.ts)

Replace the placeholder Instagram and LinkedIn entries with the supplied real links:

- Instagram: handle `@cai.kmc`, href `https://www.instagram.com/cai.kmc/`
- LinkedIn: handle `/company/the-centre-for-artificial-intelligence`, href `https://www.linkedin.com/company/the-centre-for-artificial-intelligence/`

GitHub and X stay as placeholders. These flow automatically to the footer and Contact page.

## 2. Prepare Parth's photo

- Source: the uploaded photo `IMG-20260919-WA0016.jpg` (Parth Dhingla in a suit at an outdoor event, busy background).
- Use `imagegen--edit_image` to remove the background and crop to the person: keep Parth (navy suit, light blue shirt, glasses) from roughly the waist/chest up, cut out cleanly from the festival scene, preserving his face, suit and pose exactly.
- Save the result as a transparent PNG, then register it with lovable-assets as `src/assets/parth-dhingla.png.asset.json`.
- Inspect the cutout for clipped hair/glasses before using it.

## 3. Show the photo on the Team page

- Add an optional `photo` field to `FoundingMember` in `src/data/team.ts` and set it only for Parth Dhingla.
- In `src/routes/team.tsx`, render the photo as a small circular/rounded avatar on the founding card for members that have one. Cards without a photo (the other four) keep the current text-only layout unchanged.
- Keep the existing card dimensions, typography and spacing; no new decorative effects.

## 4. Verify

- Typecheck with `bunx tsgo --noEmit`.
- Playwright check of `/team`: Parth's card shows the cutout photo with no background edges, the other founding cards are unchanged, and the footer/Contact socials link to the two real URLs.
