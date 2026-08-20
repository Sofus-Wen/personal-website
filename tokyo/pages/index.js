import Head from "next/head";
import Header from "@/src/components/Header";
import List from "@/src/components/List";
import Section from "@/src/components/Section";
import {
  CONTACT_NOTE,
  EMAIL,
  NAME,
  NOW,
  TAGLINE,
  TIMELINE,
} from "@/src/content";
export default function Home() {
  return (
    <>
      <Head>
        <title>{`${NAME} - ${TAGLINE}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`${NAME} - ${TAGLINE}`} />
      </Head>
      <Header />
      <hr />
      <main className="container">
        <p className="block">{TAGLINE}</p>
        <Section title="now">
          {NOW.map((line) => (
            <p className="line" key={line}>
              {line}
            </p>
          ))}
        </Section>
        <Section title="things i’ve done">
          <List groups={TIMELINE} />
        </Section>
        <div className="block ps">
          <p>p.s. {CONTACT_NOTE}</p>
          <p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </main>
    </>
  );
}
