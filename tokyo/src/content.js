export const NAME = "Sofus Wenøe";
export const TAGLINE = "making videos :)";
export const EMAIL = "sofus.wenoee.contact@gmail.com";

export const LINKS = {
  youtube: "https://www.youtube.com/@SofusWenoee",
  instagram: "https://www.instagram.com/sofuswenoee/",
  linkedin: "https://www.linkedin.com/in/sofuswenoee",
};

export const NAV = [
  { label: "YouTube", href: LINKS.youtube },
  { label: "Instagram", href: LINKS.instagram },
  { label: "LinkedIn", href: LINKS.linkedin },
];

export const NOW = [
  "- coming back to japan.",
  "- finding my people. making good shit together.",
  "-> films, music, fashion, startups, whatever...",
];

/* A name or description is either a plain string, or an array of segments
   where a segment may be {text, href} to link part of the line. */
export const TIMELINE = [
  {
    year: "2025\u20132026",
    items: [
      {
        name: "TETR",
        desc: "traveled around building businesses. made Fuji Chocolates in india, then dropped out :)",
      },
    ],
  },
  {
    year: "2024\u20132025",
    items: [
      {
        name: "exchange in japan",
        desc: "spent a year at a japanese high school. probably the best year of my life",
        href: "https://youtu.be/Egg8OXpQG5M",
      },
    ],
  },
  {
    year: "2023\u20132024",
    items: [
      {
        key: "tks",
        name: [{ text: "TKS", href: "https://tks.world/" }, " / toronto"],
        desc: "spent a couple years building things with AI & speaking about them",
      },
      {
        name: "buildspace",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7228701780937740289/",
        desc: "spent the summer in sf with Mats & Pranava",
      },
    ],
  },
  {
    year: "2022\u20132023",
    items: [{ name: "fashion school \u00b7 hypnosis / NLP \u00b7 Taiyo" }],
  },
];

export const CONTACT_NOTE = "if you wanna make something together, say hi :)";
