export const CARDS = [
  ["card-01","Tokyo Tower","Metal Of Tanks"],
  ["card-02","Kinkaku-ji","The Eternal Reflection"],
  ["card-03","Kiyomizu-dera","A Monk's Dream"],
  ["card-04","Itsukushima Torii","Entrance To The Sacred"],
  ["card-05","Arashiyama Bamboo","Peaceful Whispers"],
  ["card-06","Fushimi Inari Shrine","Countless Hopes"],
  ["card-07","Kaminarimon Gate","Space For Humans"],
  ["card-08","Himeji Castle","Graceful Warrior"],
  ["card-09","Nikko Tosho-gu","A Great Man's Wish"],
  ["card-10","Mount Fuji","Bigger Than Life"],
];

export const CONTENT = {
  stall: {
    kicker: "the stall", title: "this table, most days",
    img: "img/stall.jpg",
    html: `<p class="lede">Five of us: two behind the counter, three out front
      stopping people as they walked past.</p>
      <p>The bunting, the board and the folding table went up and came down
      again every time. This is where almost all of it was sold.</p>
      <p>Between us we had more than 45,000 subscribers and over 2 million
      views, so the marketing was founder-led from the start. We never paid
      for reach — we filmed what we were doing and pointed people at the
      table.</p>`,
    grid: ["img/popup.jpg","img/stand-rack.jpg"]
  },
  brand: {
    kicker: "the brand", title: "FUJI · japanese chocolates",
    html: `<p class="lede">Japanese flavours, made in India. The name was the
      mountain, and everything else followed from that.</p>
      <p>Navy, gold and white, with the flavour set in a serif down the front.
      That's the one that shipped and the one on the table.</p>
      <p>We designed a second generation later — a kamon crest, the flavour in
      Japanese — and never released it. It's here as a curiosity, not as the
      product.</p>`,
    two: [["img/old-matcha.jpg","what we sold"],["img/bar-matcha.jpg","the redesign, never released"]]
  },
  supply: {
    kicker: "inventory", title: "made outside Delhi",
    img: "img/packed.jpg",
    html: `<p class="lede">We wrote the recipes ourselves and found a small
      manufacturer in India to produce them, importing the matcha, yuzu and
      black sesame from abroad.</p>
      <p>Stock lived in cardboard boxes under and behind the table, and we
      counted it by hand at the end of every day.</p>`
  },
  matcha: { kicker:"抹茶 · matcha", title:"Matcha Chocolate", img:"img/old-matcha.jpg",
    html:`<p class="lede">Uji matcha in white chocolate. The one that sold first,
      every time.</p>`,
    two:[["img/old-matcha.jpg","what we sold"],["img/bar-matcha.jpg","unreleased redesign"]] },
  sesame: { kicker:"黒ごま · kuro goma", title:"Black Sesame Chocolate", img:"img/old-sesame.jpg",
    html:`<p class="lede">Roasted black sesame paste in milk chocolate. The one
      people hesitated over and then came back for.</p>`,
    two:[["img/old-sesame.jpg","what we sold"],["img/bar-sesame.jpg","unreleased redesign"]] },
  yuzu: { kicker:"ゆず · yuzu", title:"Japanese Lemon Chocolate", img:"img/old-yuzu.jpg",
    html:`<p class="lede">Yuzu against a sweet couverture. The brightest of the
      three.</p>`,
    two:[["img/old-yuzu.jpg","what we sold"],["img/bar-yuzu.jpg","unreleased redesign"]] },
  samples: {
    kicker: "on the counter", title: "a plate of samples",
    html: `<p class="lede">There was always a plate out so people could taste
      everything before buying.</p>
      <p>It did more work than any of our five sales pitches. Black sesame in
      particular — nobody bought it until they'd tried it.</p>`
  },
  cards: {
    kicker: "inside every bar", title: "ten places, one at a time",
    html: `<p class="lede">Every bar carried a collectable card — a place in
      Japan, a name we gave it, and a number out of ten. You couldn't pick
      which one you got.</p>
      <p>Cheapest thing we made, and the reason people bought a second bar.</p>`,
    cards: true
  },
  numbers: {
    kicker: "the cash box", title: "what it actually did",
    html: `<p class="lede">₹400 a bar against ₹185 to make one.</p>`,
    figs: [["₹5,08,800","revenue"],["₹2,07,053","net profit"],
           ["54.6%","gross margin"],["43%","net margin"],
           ["₹400","selling price"],["₹185","average COGS"]],
    after: `<p>Highest-revenue team in our TETR cohort, over about two months.
      The market we were aiming at was ₹2,700 CR of premium chocolate in India,
      projected to ₹3,990 CR by 2031, with Japanese food imports up 400%
      between 2020 and 2024.</p>`
  },
  popups: {
    kicker: "out front", title: "stopping people",
    img: "img/popup.jpg",
    html: `<p class="lede">Three of us worked the front — handing out samples,
      explaining what yuzu was, and getting people to stand still long enough
      to try one.</p>
      <p>Pop-ups and direct sales carried the business before any shop did.</p>`
  },
  retail: {
    kicker: "distribution", title: "getting on a shelf",
    img: "img/shelf.jpg",
    html: `<p class="lede">We walked into stores and pitched until somebody said
      yes.</p>
      <p>That's Fuji sitting between Lindt and Cadbury — three facings, in a
      store that had never stocked a Japanese chocolate before.</p>`
  },
  pitch: {
    kicker: "the pitch", title: "₹1,70,000, declined",
    img: "img/cheque.jpg",
    html: `<p class="lede">We pitched Fuji at the Brand Wars grand final and were
      offered ₹1,70,000 to keep going.</p>
      <p>We didn't take it. The business worked — the numbers were there, the
      shelf was there — but my heart wasn't in it, and taking someone's money to
      run a thing I didn't want to run seemed like the wrong trade.</p>
      <p>We stopped at the end of the semester.</p>`
  },
  team: {
    kicker: "behind the counter", title: "Pablo, Leo, Krishna & Steve",
    img: "img/stall.jpg",
    html: `<p class="lede">I led the project and its direction, and worked mostly
      across product, branding, packaging, pricing, supply chain and sales.</p>
      <p>Everyone did everything. Mostly that meant standing behind a folding
      table talking to strangers about chocolate.</p>`,
    grid: ["img/packed.jpg","img/blossoms.jpg"]
  },
  ending: {
    kicker: "may 2026", title: "and then we went to Mt. Fuji",
    img: "img/mtfuji.jpg",
    html: `<p class="lede">We took some of what we made and spent it on the five
      of us standing in a field in front of the mountain the whole thing was
      named after.</p><p>Good place to stop.</p>`
  }
};
