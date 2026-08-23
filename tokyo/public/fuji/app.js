/* The stand: click an object, read what it was. Content is drawn only from
   what actually happened — the deck, the packaging files and the photos. */

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
  pivot: {
    kicker: "how it started",
    title: "the idea before this one",
    html: `
      <p class="lede">Fuji didn't start as chocolate. It started as mystery boxes —
      candy from around the world, five of us from five different countries picking
      what went in.</p>
      <p>People liked opening them. They just didn't trust a mystery box enough to
      buy one. So we narrowed it to Japanese candy, and the import duties ate the
      margin before we'd sold a thing.</p>
      <p>So we stopped importing other people's sweets and made our own.</p>`
  },
  matcha: {
    kicker: "抹茶 · matcha",
    title: "Matcha Chocolate",
    img: "img/bar-matcha.jpg",
    html: `
      <p class="lede">Uji matcha folded into white chocolate. Japan-origin
      ingredients, made in India — the thing that didn't exist on the shelf we
      wanted to be on.</p>
      <p>We wrote the recipes ourselves and worked with a small manufacturer
      outside Delhi to produce them locally, importing the matcha, yuzu and black
      sesame from abroad.</p>`,
    two: [["img/old-matcha.jpg","first design"],["img/bar-matcha.jpg","where it ended up"]]
  },
  sesame: {
    kicker: "黒ごま · kuro goma",
    title: "Black Sesame Chocolate",
    img: "img/bar-sesame.jpg",
    html: `
      <p class="lede">Roasted black sesame paste in milk chocolate. The one people
      hesitated over and then came back for.</p>`,
    two: [["img/old-sesame.jpg","first design"],["img/bar-sesame.jpg","where it ended up"]]
  },
  yuzu: {
    kicker: "ゆず · yuzu",
    title: "Japanese Lemon Chocolate",
    img: "img/bar-yuzu.jpg",
    html: `
      <p class="lede">Yuzu against a sweet couverture. The brightest of the three,
      and the one that photographed best against a cherry tree.</p>`,
    two: [["img/old-yuzu.jpg","first design"],["img/bar-yuzu.jpg","where it ended up"]]
  },
  cards: {
    kicker: "inside every bar",
    title: "ten places, one at a time",
    html: `
      <p class="lede">Each bar carried a collectable card — a place in Japan, a name
      we gave it, and a number out of ten. You couldn't choose which one you got.</p>
      <p>It was the cheapest thing we made and the reason people bought a second bar.</p>`,
    cards: true
  },
  numbers: {
    kicker: "the first three months",
    title: "what it actually did",
    html: `
      <p class="lede">₹400 a bar against ₹185 to make one. We sold through pop-ups,
      direct, and eventually retail.</p>`,
    figs: [
      ["₹5,08,800","revenue"],["₹2,07,053","net profit"],
      ["54.6%","gross margin"],["43%","net margin"],
      ["₹400","selling price"],["₹185","average COGS"]
    ],
    after: `<p>Highest-revenue team in our TETR cohort. The market we were aiming at
      was ₹2,700 CR of premium chocolate in India, projected to ₹3,990 CR by 2031,
      with Japanese food imports up 400% between 2020 and 2024.</p>`
  },
  retail: {
    kicker: "distribution",
    title: "getting on a shelf",
    img: "img/shelf.jpg",
    html: `
      <p class="lede">We walked into stores and pitched until somebody said yes.</p>
      <p>That's Fuji sitting between Lindt and Cadbury — three facings, matcha, yuzu
      and black sesame, in a Delhi store that had never stocked a Japanese
      chocolate before.</p>`,
    grid: ["img/popup.jpg","img/stand-rack.jpg"]
  },
  funding: {
    kicker: "the offer",
    title: "₹1,70,000, declined",
    img: "img/cheque.jpg",
    html: `
      <p class="lede">We won the Brand Wars grand final and were offered ₹1,70,000
      to keep going.</p>
      <p>We didn't take it. The business worked — the numbers were there, the shelf
      was there — but my heart wasn't in it, and taking someone's money to run a
      thing I didn't want to run seemed like the wrong trade.</p>
      <p>We stopped at the end of the semester.</p>`
  },
  team: {
    kicker: "the five of us",
    title: "Pablo, Leo, Krishna & Steve",
    img: "img/stall.jpg",
    html: `
      <p class="lede">I led the project and its direction, and worked mostly across
      product, branding, packaging, pricing, supply chain and sales.</p>
      <p>Most days that meant standing behind a folding table talking to strangers
      about chocolate.</p>`,
    grid: ["img/packed.jpg","img/blossoms.jpg"]
  },
  ending: {
    kicker: "may 2026",
    title: "and then we went to Mt. Fuji",
    img: "img/mtfuji.jpg",
    html: `
      <p class="lede">We took some of what we made and spent it on the five of us
      standing in a field in front of the mountain the whole thing was named after.</p>
      <p>Good place to stop.</p>`
  }
};

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
  if (c.two) {
    h += `<div class="two">` + c.two.map(([src, cap]) =>
      `<figure><img src="${src}" alt=""><figcaption>${cap}</figcaption></figure>`).join("") + `</div>`;
  }
  if (c.grid) {
    h += `<div class="grid">` + c.grid.map(src => `<img src="${src}" alt="">`).join("") + `</div>`;
  }
  if (c.cards) {
    h += `<div class="grid">` + CARDS.map(([f, place, name]) =>
      `<figure style="margin:0">
         <img src="img/${f}.jpg" alt="${place}">
         <figcaption style="color:var(--muted);font-size:11px;margin-top:6px">${name}<br>${place}</figcaption>
       </figure>`).join("") +
       `<figure style="margin:0"><img src="img/coupon.jpg" alt="Valentine's coupon">
        <figcaption style="color:var(--muted);font-size:11px;margin-top:6px">₹50 off<br>valentine's</figcaption></figure>` +
      `</div>`;
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

document.querySelectorAll(".obj").forEach(el =>
  el.addEventListener("click", () => {
    nudge.classList.add("gone");
    render(el.dataset.key);
  }));
document.getElementById("close").addEventListener("click", close);
scrim.addEventListener("click", close);
document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
