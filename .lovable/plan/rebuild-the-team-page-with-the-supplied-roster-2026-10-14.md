# Rebuild the Team Page with the Supplied Roster

## Goal

Replace the placeholder team page with the real two-tier structure: **The Founding Team** (5 people) first, then **The Student Team** (16 entries) organized by role. Use only the supplied names, positions, official course labels, and study years. No photos, biographies, or social links are invented.

## Data model — rewrite `src/data/team.ts`

Replace the placeholder roster with typed, data-driven arrays:

```ts
type FoundingMember = { name: string; role: "President" | "Vice President" | "Advisory" };
type StudentMember = {
  id: string;
  name: string;
  role: string;
  course: string;
  year: string;
  group: RoleGroup;
};
type RoleGroup =
  | "President"
  | "Vice Presidents"
  | "Advisory"
  | "Coordinators"
  | "Tech & Social Media Heads"
  | "Finance & Operations Heads"
  | "Event & Outreach Heads"
  | "AI Foundation Board Head"
  | "AI Implementation Lab Head";
```

- **Founding Team** (name + role only, in this order): Parth Dhingla — President; Yash Yadav — Vice President; Diksha Nath — Vice President; Khushi Agarwal — Vice President; Ved Bhatia — Advisory.
- **Student Team** — all 16 entries, exactly once, in the supplied groups:
  - President: Parth Dhingla — President — B. Com. (P) — 3rd
  - Vice Presidents: Khushi Agarwal (B. Com. (H), 3rd), Diksha Nath (B. Com. (H), 3rd), Yash Yadav (B.A. (H) Economics, 3rd)
  - Advisory: Ved Bhatia (B.A. (H) Economics, 3rd)
  - Coordinators: Mayank Kumar Bhagat (B.Sc. (H) Mathematics, 2nd), Bhavesh Balwan (B.A. (H) Economics, 2nd)
  - Tech & Social Media Heads: Kapish Bhatia (B.Sc. (H) Mathematics, 2nd), Vandana Kakkar (B.Sc. (H) Statistics, 2nd)
  - Finance & Operations Heads: Yogita Singh (B. Com. (P), 2nd), Vanie Mishra (B. Com. (P), 2nd), Ankit Kumar (B.A. (H) English, 2nd)
  - Event & Outreach Heads: Prince Agarwal (B.A. (H) Economics, 2nd), Anuj Kumar Singh (B. Com. (H), 2nd)
  - AI Foundation Board Head: Ishita Sood (B.A. Programme, 2nd)
  - AI Implementation Lab Head: Tomesh Mandloi (B.Sc. (H) Physics, 2nd)
- Drop the old `links`, `photo`, `department`, and `TeamGroup` filter types — nothing fabricated.
- Add a short comment at the top: source = supplied roster; verify uncertain course mappings against official records before production (the supplied verification note), plus the official course list as the allowed set.

## Page — rebuild `src/routes/team.tsx`

Keep the existing design system (Space Grotesk headings, mono role labels, card/Reveal utilities, `Section`). Remove the group-filter buttons — role groupings replace filtering.

1. **Page intro** (minimal): eyebrow "Our team" + a short title/lead; no fabricated statistics.
2. **Section 1 — The Founding Team** (first):
   - Heading "The Founding Team", subheading "The founding leadership behind CAI."
   - Prominent layout: 5 wider cards (e.g. first card President spanning larger, or a 3+2 responsive grid) with larger name typography; role label under the name.
   - Cards show **name + position only** — course/year are not shown here because the founding-section spec lists only name and position, and unconfirmed details must not be added. The same people's verified course/year appear on their Student Team cards.
3. **Section 2 — The Student Team** (immediately below):
   - Heading "The Student Team", subheading "The student leadership and functional teams driving CAI's initiatives, projects, and operations."
   - One heading per role group (President, Vice Presidents, Advisory, Coordinators, Tech & Social Media Heads, Finance & Operations Heads, Event & Outreach Heads, AI Foundation Board Head, AI Implementation Lab Head), members in a responsive card grid under each.
   - Every card shows: **full name** (primary, easy to scan), **position** (mono label), **course** (exact official label, wraps naturally, `break-words`, min-height so multi-line titles keep cards aligned), **year of study** ("Year 3" / "Year 2").
   - No photo slots, no bio, no social icons. Compact, uniform card dimensions; no oversized visuals.
4. **Accessibility / UX**: single `<h1>`-consistent heading hierarchy across the page, semantic lists, subtle Reveal only (no distracting animation), focus states preserved, readable long course names on mobile (grid collapses to 1 column, text wraps), reduced-motion already handled by `Reveal`.
5. **Metadata**: update the route `head()` description to mention the founding and student team; keep og tags image-free (no absolute hero image).

## Checks

- Count audit: the rendered page shows exactly 5 founding cards and 16 student cards, each name exactly once.
- `bunx tsgo --noEmit` passes; build log shows OK.
- Playwright pass at desktop + mobile width: sections ordered correctly, all 16 names present, long course titles wrap without overflow.
