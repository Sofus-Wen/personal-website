import Head from "next/head";
import ExternalLink from "@/src/components/ExternalLink";
import Header from "@/src/components/Header";
import ProjectList from "@/src/components/ProjectList";
import Section from "@/src/components/Section";
import {
  CONTACT_NAV,
  EMAIL,
  NAME,
  OTHER_STUFF,
  PROJECTS,
  RIGHT_NOW,
  TAGLINE,
} from "@/src/content";

export default function Home() {
  return (
    <>
      <Head>
        <title>{NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`${NAME} — ${TAGLINE}`} />
      </Head>

      <Header />
      <hr />

      <main className="container">
        <Section title="things I’ve made">
          <ProjectList groups={PROJECTS} />
        </Section>

        <Section title="other stuff">
          {OTHER_STUFF.map((line) => (
            <p className="line" key={line}>
              {line}
            </p>
          ))}
        </Section>

        <Section title="right now">
          {RIGHT_NOW.map((line) => (
            <p className="line" key={line}>
              {line}
            </p>
          ))}
        </Section>

        <Section title="contact">
          <p className="line">if you want to make something together, say hi :)</p>
          <p className="line">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <nav>
            {CONTACT_NAV.map((item) => (
              <ExternalLink key={item.label} href={item.href}>
                {item.label}
              </ExternalLink>
            ))}
          </nav>
        </Section>
      </main>
    </>
  );
}
