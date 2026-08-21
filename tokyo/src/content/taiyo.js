export const OPENING = "started a clothing brand with a friend when i was 14.";

export const GROUPS = [
  {
    items: [
      { name: "one of my earliest serious attempts at making something" },
      { name: "went deep into fashion & digital design around the same time" },
      { name: "studied at a fashion school in copenhagen" },
      {
        name: "went to paris to try to understand fashion and design more seriously",
      },
    ],
  },
];

/* The site i built for the brand. The shell is a rework of Antoine Guillou's
   kanye2049.com, which i loved enough to spend months inside of. Credited
   here and in the site's own humans.txt. */
export const SITE = [
  {
    items: [
      {
        key: "site",
        name: [
          "the final website i made never got published, but it was called ",
          { text: "taiyo2049", href: "/taiyo2049" },
          ".",
        ],
      },
      {
        key: "credit",
        name: [
          "(shoutout ",
          { text: "antoine guillou", href: "https://antoineguillou.fr" },
          "\u2019s ",
          { text: "kanye2049", href: "https://kanye2049.com/" },
          ")",
        ],
      },
    ],
  },
];

/* Everything below is my own: the drawings, the clothes, the boards, the
   photos from fashion school. */
export const IMAGES = [
  {
    src: "/taiyo/storyboard.jpg",
    href: "/taiyo/storyboard-full.jpg",
    alt: "Dozens of hand-drawn Taiyo storyboard frames tiled together",
    caption: "drew the whole brand out, frame by frame.",
    hrefLabel: "open it full size.",
  },
  {
    src: "/taiyo/hoodie-sunset.jpg",
    alt: "Someone wearing the white LOREM IPSUM hoodie at sunset",
    caption: "the LOREM IPSUM hoodie",
    portrait: true,
  },
  {
    src: "/taiyo/new-stock.jpg",
    alt: "Campaign photo at dusk captioned new stock",
    caption: "new stock",
    portrait: true,
  },
  {
    src: "/taiyo/moodboard.jpg",
    alt: "Printed cut-outs arranged into a moodboard",
    caption: "moodboards",
    portrait: true,
  },
  {
    src: "/taiyo/show-lineup.jpg",
    alt: "Line-up of models in student-made garments at a show",
    caption: "the show at fashion school",
  },
  {
    src: "/taiyo/atelier.jpg",
    alt: "Studio full of workbenches, mannequins and materials",
    caption: "the studio in copenhagen",
  },
  {
    src: "/taiyo/paris.jpg",
    alt: "Class photo in front of the Eiffel Tower",
    caption: "paris",
  },
];
