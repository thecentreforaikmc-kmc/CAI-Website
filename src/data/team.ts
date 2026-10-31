/**
 * Team roster — source: supplied "Team Page — Required Structure" document.
 *
 * Rules for this file:
 * - Names, positions, courses and years are the supplied records. Keep full
 *   names exactly as supplied; never shorten or merge similar names.
 * - Do not add photos, biographies, or social links that are not supplied.
 * - Course labels must come from the official course naming standard below.
 *   Any uncertain mapping must be confirmed against the student's official
 *   university record before production.
 *
 * Official course labels (the only allowed values for `course`):
 *   B.A. (H) Economics | B.A. (H) English | B.A. (H) Geography | B.A. (H) Hindi
 *   B.A. (H) History | B.A. (H) Political Science | B.A. (H) Sanskrit
 *   B.A. Programme | B.Sc. Applied Physical Science (Analytical Chemistry)
 *   B.Sc. Applied Physical Science (Computer Science) | B.Sc. Life Sciences
 *   B.Sc. Physical Sciences | B.Sc. (H) Botany | B.Sc. (H) Chemistry
 *   B.Sc. (H) Mathematics | B.Sc. (H) Physics | B.Sc. (H) Zoology
 *   B.Sc. (H) Statistics | B. Com. (H) | B. Com. (P) | B.A. (H) Urdu
 */

export type FoundingRole = "President" | "Vice President" | "Advisory";

export type FoundingMember = {
  name: string;
  role: FoundingRole;
  /** Optional supplied portrait. Only added when a real photo is supplied. */
  photo?: string;
};

export type RoleGroup =
  | "President"
  | "Vice Presidents"
  | "Advisory"
  | "Coordinators"
  | "Tech & Social Media Heads"
  | "Finance & Operations Heads"
  | "Event & Outreach Heads"
  | "AI Foundation Board Head"
  | "AI Implementation Lab Head";

export type StudentMember = {
  id: string;
  name: string;
  role: string;
  course: string;
  year: string;
  group: RoleGroup;
  /** Optional portrait — place images in /public/team/ */
  photo?: string;
};

/** The Founding Team — name and position only, in the supplied order. */
export const foundingTeam: FoundingMember[] = [
  { name: "Parth Dhingla", role: "President" },
  { name: "Yash Yadav", role: "Vice President", photo: "/team/yash-yadav.png" },
  { name: "Diksha Nath", role: "Vice President", photo: "/team/diksha-nath.png" },
  { name: "Khushi Agarwal", role: "Vice President", photo: "/team/khushi-agarwal.png" },
  { name: "Ved Bhatia", role: "Advisory", photo: "/team/ved-bhatia.png" },
];

/** Group headings render in this order. */
export const roleGroupOrder: RoleGroup[] = [
  "President",
  "Vice Presidents",
  "Advisory",
  "Coordinators",
  "Tech & Social Media Heads",
  "Finance & Operations Heads",
  "Event & Outreach Heads",
  "AI Foundation Board Head",
  "AI Implementation Lab Head",
];

/**
 * The Student Team — all 16 supplied entries, exactly once.
 *
 * All portraits below are PROCESSED: background removed and supplied by the
 * team, stored in `public/team/` and ready for display on the Team page.
 */
export const studentTeam: StudentMember[] = [
  // President
  // Photo: pending — the correct processed portrait of Parth Dhingla has not been supplied yet.
  {
    id: "s1",
    name: "Parth Dhingla",
    role: "President",
    course: "B. Com. (P)",
    year: "3rd",
    group: "President",
  },

  // Vice Presidents
  // Photo: PROCESSED — public/team/khushi-agarwal.png
  {
    id: "s2",
    name: "Khushi Agarwal",
    role: "Vice President",
    course: "B. Com. (H)",
    year: "3rd",
    group: "Vice Presidents",
    photo: "/team/khushi-agarwal.png",
  },
  // Photo: PROCESSED — public/team/diksha-nath.png
  {
    id: "s3",
    name: "Diksha Nath",
    role: "Vice President",
    course: "B. Com. (H)",
    year: "3rd",
    group: "Vice Presidents",
    photo: "/team/diksha-nath.png",
  },
  // Photo: PROCESSED — public/team/yash-yadav.png
  {
    id: "s4",
    name: "Yash Yadav",
    role: "Vice President",
    course: "B.A. (H) Economics",
    year: "3rd",
    group: "Vice Presidents",
    photo: "/team/yash-yadav.png",
  },

  // Advisory
  // Photo: PROCESSED — public/team/ved-bhatia.png
  {
    id: "s5",
    name: "Ved Bhatia",
    role: "Advisory",
    course: "B.A. (H) Economics",
    year: "3rd",
    group: "Advisory",
    photo: "/team/ved-bhatia.png",
  },

  // Coordinators
  // Photo: PROCESSED — public/team/mayank-bhagat.png
  {
    id: "s6",
    name: "Mayank Kumar Bhagat",
    role: "Coordinator",
    course: "B.Sc. (H) Mathematics",
    year: "2nd",
    group: "Coordinators",
    photo: "/team/mayank-bhagat.png",
  },
  // Photo: PROCESSED — public/team/bhavesh-balwan.png
  {
    id: "s7",
    name: "Bhavesh Balwan",
    role: "Coordinator",
    course: "B.A. (H) Economics",
    year: "2nd",
    group: "Coordinators",
    photo: "/team/bhavesh-balwan.png",
  },

  // Tech & Social Media Heads
  // Photo: PROCESSED — public/team/kapish-bhatia.png
  {
    id: "s8",
    name: "Kapish Bhatia",
    role: "Tech & Social Media Head",
    course: "B.Sc. (H) Mathematics",
    year: "2nd",
    group: "Tech & Social Media Heads",
    photo: "/team/kapish-bhatia.png",
  },
  // Photo: PROCESSED — public/team/vandana-kakkar.png
  {
    id: "s9",
    name: "Vandana Kakkar",
    role: "Tech & Social Media Head",
    course: "B.Sc. (H) Statistics",
    year: "2nd",
    group: "Tech & Social Media Heads",
    photo: "/team/vandana-kakkar.png",
  },

  // Finance & Operations Heads
  // Photo: PROCESSED — public/team/yogita-singh.png
  {
    id: "s10",
    name: "Yogita Singh Bundela",
    role: "Finance & Operations Head",
    course: "B. Com. (P)",
    year: "2nd",
    group: "Finance & Operations Heads",
    photo: "/team/yogita-singh.png",
  },
  // Photo: PROCESSED — public/team/vanie-mishra.png
  {
    id: "s11",
    name: "Vanie Mishra",
    role: "Finance & Operations Head",
    course: "B. Com. (P)",
    year: "2nd",
    group: "Finance & Operations Heads",
    photo: "/team/vanie-mishra.png",
  },
  // Photo: PROCESSED — public/team/ankit-kumar.png
  {
    id: "s12",
    name: "Ankit Kumar",
    role: "Finance & Operations Head",
    course: "B.A. (H) English",
    year: "2nd",
    group: "Finance & Operations Heads",
    photo: "/team/ankit-kumar.png",
  },

  // Event & Outreach Heads
  // Photo: PROCESSED — public/team/prince-agarwal.png
  {
    id: "s13",
    name: "Prince Agarwal",
    role: "Event & Outreach Head",
    course: "B.A. (H) Economics",
    year: "2nd",
    group: "Event & Outreach Heads",
    photo: "/team/prince-agarwal.png",
  },
  // Photo: PROCESSED — public/team/anuj-kumar.png
  {
    id: "s14",
    name: "Anuj Kumar Singh",
    role: "Event & Outreach Head",
    course: "B. Com. (H)",
    year: "2nd",
    group: "Event & Outreach Heads",
    photo: "/team/anuj-kumar.png",
  },

  // AI Foundation Board Head
  // Photo: PROCESSED — public/team/ishita-sood.png
  {
    id: "s15",
    name: "Ishita Sood",
    role: "AI Foundation Board Head",
    course: "B.A. Programme",
    year: "2nd",
    group: "AI Foundation Board Head",
    photo: "/team/ishita-sood.png",
  },

  // AI Implementation Lab Head
  // Photo: PROCESSED — public/team/tomesh-mandle.png
  {
    id: "s16",
    name: "Tomesh Mandle",
    role: "AI Implementation Lab Head",
    course: "B.Sc. (H) Physics",
    year: "2nd",
    group: "AI Implementation Lab Head",
    photo: "/team/tomesh-mandle.png",
  },
];
