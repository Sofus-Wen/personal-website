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
  "coming back to japan.",
  "looking for people I like making things with.",
  "films, music, fashion, startups, whatever.",
];

/* Descriptions are plain strings, or an array of segments when part of the
   line should link somewhere. */
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
        name: "TKS",
        href: "https://tks.world/",
        desc: [
          "spent a couple years experimenting with AI: ",
          { text: "Tanar", href: "https://youtu.be/4Se1xhJhYr4" },
          ", ",
          { text: "Solon", href: "https://youtu.be/6ogm8ZXvXRc" },
          ", ",
          { text: "PANTRA", href: "https://youtu.be/CLRQ5qoxN88" },
          ", ",
          { text: "LazyStudent", href: "https://youtu.be/DyLjlLCo6d0" },
        ],
      },
      {
        name: "buildspace",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7228701780937740289/",
        desc: "spent a summer in sf building with some really cool people",
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        name: "Taiyo",
        desc: "started a clothing brand with a friend at 14",
      },
    ],
  },
];

export const CONTACT_NOTE = "if you wanna make something together, say hi :)";
