/** Central content for the CAI website.
 * Replace the values below with the society's official details.
 */

/** Primary navigation, shared by the header and footer. */
export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/team", label: "Team" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

/** Headline numbers shown on the home page. */
export const stats = [
  { label: "Founding members", value: "5" },
  { label: "Student team", value: "16" },
  { label: "Projects", value: "6" },
  { label: "Courses represented", value: "8" },
] as const;

export const site = {
  shortName: "Centre for Artificial Intelligence",
  name: "Centre for Artificial Intelligence",
  college: "Kirori Mal College",
  university: "University of Delhi",
  positioning:
    "A student-led centre for artificial intelligence at Kirori Mal College — where curiosity becomes research, and research becomes something you can run.",
  contact: {
    email: "cai.kmc@kmc.du.ac.in",
    phone: "+91 11 2386 2386",
    addressLines: [
      "Centre for Artificial Intelligence",
      "Kirori Mal College, University of Delhi",
      "Delhi 110007, India",
    ],
    officeHours: "Mon–Fri, 10:00 AM – 5:00 PM",
  },
  socials: [
    { label: "Instagram", handle: "@cai.kmc", href: "https://www.instagram.com/cai.kmc/" },
    {
      label: "LinkedIn",
      handle: "/company/the-centre-for-artificial-intelligence",
      href: "https://www.linkedin.com/company/the-centre-for-artificial-intelligence/",
    },
    { label: "GitHub", handle: "/centre-for-ai-kmc", href: "https://github.com/centre-for-ai-kmc" },
    { label: "X", handle: "@cai_kmc", href: "https://x.com/cai_kmc" },
  ],
} as const;
