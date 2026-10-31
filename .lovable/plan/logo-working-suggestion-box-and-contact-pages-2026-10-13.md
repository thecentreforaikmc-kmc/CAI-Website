# Logo + working Suggestion Box and Contact pages

## 1. Use the uploaded seal as the CAI logo

- Upload the image as a hosted asset and use it in the navbar and footer in place of the "C" badge.
- Generate a favicon from it (real file in public/).

## 2. Turn on Lovable Cloud (retry)

- Enable the backend so form submissions are stored.

## 3. Suggestion Box page (/suggestions)

- Fields: name (optional), email (optional), category, suggestion.
- Validation on both browser and server, privacy note ("name and email are optional; only the committee sees this").
- Success state with "send another"; error state on failure.
- Each submission saved to a `suggestions` table.

## 4. Contact page (/contact)

- Placeholder contact info, socials, campus/location block.
- Form: name, email, subject, message with validation, success/error states.
- Saved to a `contact_messages` table.

## 5. Email notifications

- After saving, email the society inbox about each new submission.
- Requires a verified sending domain on a paid plan; if none exists, submissions still save and I will tell you what is needed to turn emails on. I will also need the real address that should receive them.

## Technical details

- Tables with RLS on, no public read; inserts via server functions (zod validation, length limits, honeypot field).
- Submissions viewable in Cloud → Database.
- Test one submission per form, confirm the row, delete the test row.
- Head metadata for both new routes.
