import Head from "next/head";

const EMAIL = "sofus@acuityworld.com";

const LINKS = {
  youtube: "https://www.youtube.com/@SofusWenoee",
  instagram: "https://www.instagram.com/sofuswenoee/",
  linkedin: "https://www.linkedin.com/in/sofuswenoee",
};

const YEARS = [
  {
    year: "2026",
    items: [
      { name: "Fuji Chocolates", desc: "made Japanese-inspired chocolates in India" },
    ],
  },
  {
    year: "2025",
    items: [
      { name: "YouTube", desc: "videos about my life", href: LINKS.youtube },
      {
        name: "Valentine’s Day in Japan",
        desc: "one of my favorite videos I’ve made",
        href: "https://www.youtube.com/watch?v=Egg8OXpQG5M",
      },
    ],
  },
  {
    year: "2024",
    items: [
      { name: "Tanar AI", desc: "built a virtual AI teacher" },
      {
        name: "Solon AI",
        desc: "tried making education more personal",
        href: "https://medium.com/@sofuswenoee/reimagining-education-with-project-solon-a-personal-game-of-learning-b9d3454a81cf",
      },
      {
        name: "PANTRA",
        desc: "predicting personality from writing",
        href: "https://medium.com/@sofuswenoee/decoding-personality-with-ai-introducing-pantra-9aa268139f65",
      },
      {
        name: "LazyStudent",
        desc: "AI notes + recommendations from lectures",
        href: "https://medium.com/@sofuswenoee/how-i-built-lazystudent-to-hack-my-way-to-better-grades-without-the-effort-ab376391096b/",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        name: "PerfectFit",
        desc: "tried using 3D scanning to make clothes fit better online",
      },
      {
        name: "Taiyo",
        desc: "tried starting a clothing brand with a friend when I was 14",
      },
    ],
  },
];

const OTHER = [
  "exchange student at a Japanese high school",
  "buildspace s5 in San Francisco",
  "spoke at PUZZLE X in Barcelona",
  "spoke at the AI for Education Summit",
  "built businesses in Dubai + India at TETR",
  "dropped out in 2026 :)",
];

function External({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Sofus Wenøe</title>
      </Head>

      <header>
        <h1>Sofus Wenøe</h1>
        <p>making videos :)</p>
        <nav>
          <External href={LINKS.youtube}>YouTube</External>
          <External href={LINKS.instagram}>Instagram</External>
          <External href={LINKS.linkedin}>LinkedIn</External>
        </nav>
      </header>

      <hr />

      <main>
        <section>
          <h2>things I&rsquo;ve made</h2>
          {YEARS.map((group) => (
            <div className="year" key={group.year}>
              <p className="year-label">{group.year}</p>
              {group.items.map((item) => (
                <p className="item" key={item.name}>
                  {item.href ? (
                    <External href={item.href}>{item.name}</External>
                  ) : (
                    <span className="item-name">{item.name}</span>
                  )}
                  <span className="dash"> - </span>
                  <span className="desc">{item.desc}</span>
                </p>
              ))}
            </div>
          ))}
        </section>

        <section>
          <h2>other stuff</h2>
          {OTHER.map((line) => (
            <p className="item" key={line}>
              {line}
            </p>
          ))}
        </section>

        <section>
          <h2>right now</h2>
          <p className="item">coming back to Japan.</p>
          <p className="item">
            I want to find people I genuinely like making things with.
          </p>
          <p className="item">
            films, music, fashion, startups, whatever we&rsquo;re excited about.
          </p>
        </section>

        <section>
          <h2>contact</h2>
          <p className="item">
            if you want to make something together, say hi :)
          </p>
          <p className="item">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <nav>
            <External href={LINKS.instagram}>Instagram</External>
            <External href={LINKS.youtube}>YouTube</External>
            <External href={LINKS.linkedin}>LinkedIn</External>
          </nav>
        </section>
      </main>

      <style jsx>{`
        header,
        main {
          max-width: 44rem;
          padding: 0 1.5rem;
        }

        header {
          padding-top: 3rem;
          padding-bottom: 1.75rem;
        }

        main {
          padding-top: 1.75rem;
          padding-bottom: 5rem;
        }

        hr {
          border: 0;
          border-top: 1px solid var(--rule);
          margin: 0;
        }

        nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0 1.25rem;
          margin-top: 0.75rem;
        }

        section {
          margin-bottom: 2.75rem;
        }

        section:last-child {
          margin-bottom: 0;
        }

        h2 {
          margin: 0 0 0.75rem;
          font-size: 1em;
          font-weight: 600;
        }

        .year {
          margin-bottom: 1.25rem;
        }

        .year:last-child {
          margin-bottom: 0;
        }

        .year-label {
          color: var(--muted);
        }

        .item {
          text-indent: -1rem;
          padding-left: 1rem;
        }

        .desc,
        .dash {
          color: var(--muted);
        }

        @media (min-width: 640px) {
          header {
            padding: 4rem 2.5rem 2rem;
          }

          main {
            padding: 2rem 2.5rem 6rem;
          }
        }
      `}</style>
    </>
  );
}
