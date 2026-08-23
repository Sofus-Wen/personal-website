/* The stall. Click a thing, read what it was. Everything here is drawn from
   the deck, the packaging files and the photos, nothing invented. */

const CARDS = [
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

const CONTENT = {
  stall: {
    kicker: "the stall", title: "this table, most days",
    img: "img/stall.jpg",
    html: `<p class="lede">Five of us: two behind the counter, three out front
      stopping people as they walked past.</p>
      <p>The bunting, the board and the folding table went up and came down
      again every time. This is where almost all of it was sold.</p>`,
    grid: ["img/popup.jpg","img/stand-rack.jpg"]
  },
  brand: {
    kicker: "the brand", title: "FUJI · japanese chocolates",
    html: `<p class="lede">Japanese flavours, made in India. The name was the
      mountain, and everything else followed from that.</p>
      <p>The packaging went through two full generations before we were happy,
      the first carried a FUJI wordmark in gold, the second dropped it for a
      kamon crest and the flavour written in Japanese.</p>`,
    two: [["img/old-matcha.jpg","first generation"],["img/bar-matcha.jpg","second"]]
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
  matcha: { kicker:"抹茶 · matcha", title:"Matcha Chocolate", img:"img/bar-matcha.jpg",
    html:`<p class="lede">Uji matcha in white chocolate. The one that sold first,
      every time.</p>`,
    two:[["img/old-matcha.jpg","first design"],["img/bar-matcha.jpg","final"]] },
  sesame: { kicker:"黒ごま · kuro goma", title:"Black Sesame Chocolate", img:"img/bar-sesame.jpg",
    html:`<p class="lede">Roasted black sesame paste in milk chocolate. The one
      people hesitated over and then came back for.</p>`,
    two:[["img/old-sesame.jpg","first design"],["img/bar-sesame.jpg","final"]] },
  yuzu: { kicker:"ゆず · yuzu", title:"Japanese Lemon Chocolate", img:"img/bar-yuzu.jpg",
    html:`<p class="lede">Yuzu against a sweet couverture. The brightest of the
      three.</p>`,
    two:[["img/old-yuzu.jpg","first design"],["img/bar-yuzu.jpg","final"]] },
  cards: {
    kicker: "inside every bar", title: "ten places, one at a time",
    html: `<p class="lede">Every bar carried a collectable card, a place in
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
    html: `<p class="lede">Three of us worked the front, handing out samples,
      explaining what yuzu was, and getting people to stand still long enough
      to try one.</p>
      <p>Pop-ups and direct sales carried the business before any shop did.</p>`
  },
  retail: {
    kicker: "distribution", title: "getting on a shelf",
    img: "img/shelf.jpg",
    html: `<p class="lede">We walked into stores and pitched until somebody said
      yes.</p>
      <p>That's Fuji sitting between Lindt and Cadbury, three facings, in a
      store that had never stocked a Japanese chocolate before.</p>`
  },
  pitch: {
    kicker: "the pitch", title: "₹1,70,000, declined",
    img: "img/cheque.jpg",
    html: `<p class="lede">We pitched Fuji at the Brand Wars grand final and were
      offered ₹1,70,000 to keep going.</p>
      <p>We didn't take it. The business worked, the numbers were there, the
      shelf was there, but my heart wasn't in it, and taking someone's money to
      run a thing I didn't want to run seemed like the wrong trade.</p>
      <p>We stopped at the end of the semester.</p>`
  },
  reach: {
    kicker: "the speaker", title: "we already had an audience",
    html: `<p class="lede">Between us we had more than 45,000 subscribers and
      over 2 million views, so the marketing was founder-led from day one.</p>
      <p>It meant we never paid for reach. We just filmed what we were doing
      and pointed people at the table.</p>`
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

/* string the bunting */
const bunting = document.getElementById("bunting");
for (let i = 0; i < 22; i++) bunting.appendChild(document.createElement("i"));

const panel = document.getElementById("panel");
const panelIn = document.getElementById("panelIn");
const scrim = document.getElementById("scrim");
const nudge = document.getElementById("nudge");

function render(key) {
  const c = CONTENT[key];
  if (!c) return;
  let h = `<p class="kicker">${c.kicker}</p><h2>${c.title}</h2>`;
  if (c.img) h += `<img class="hero" src="${c.img}" alt="">`;
  h += c.html;
  if (c.figs) {
    h += `<div class="figs">` + c.figs.map(([b, s]) =>
      `<div class="fig"><b>${b}</b><span>${s}</span></div>`).join("") + `</div>`;
    if (c.after) h += c.after;
  }
  if (c.two) h += `<div class="two">` + c.two.map(([src, cap]) =>
    `<figure><img src="${src}" alt=""><figcaption>${cap}</figcaption></figure>`).join("") + `</div>`;
  if (c.grid) h += `<div class="grid">` + c.grid.map(src => `<img src="${src}" alt="">`).join("") + `</div>`;
  if (c.cards) {
    h += `<div class="grid">` + CARDS.map(([f, place, name]) =>
      `<figure style="margin:0"><img src="img/${f}.jpg" alt="${place}">
        <figcaption style="color:var(--muted);font-size:11px;margin-top:6px">${name}<br>${place}</figcaption>
       </figure>`).join("") +
      `<figure style="margin:0"><img src="img/coupon.jpg" alt="Valentine's coupon">
        <figcaption style="color:var(--muted);font-size:11px;margin-top:6px">₹50 off<br>valentine's</figcaption></figure>`
      + `</div>`;
  }
  panelIn.innerHTML = h;
  panel.classList.add("on");
  panel.setAttribute("aria-hidden", "false");
  scrim.classList.add("on");
  panel.scrollTop = 0;
}
function close() {
  panel.classList.remove("on");
  panel.setAttribute("aria-hidden", "true");
  scrim.classList.remove("on");
}
document.querySelectorAll(".hot").forEach(el =>
  el.addEventListener("click", () => { nudge.classList.add("gone"); render(el.dataset.key); }));
document.getElementById("close").addEventListener("click", close);
scrim.addEventListener("click", close);
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
