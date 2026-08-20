import Head from "next/head";
import ExternalLink from "@/src/components/ExternalLink";
import Header from "@/src/components/Header";
import ProjectList from "@/src/components/ProjectList";
import Section from "@/src/components/Section";
import {
  CONTACT_NOTE,
  EMAIL,
  INTRO_VIDEO,
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
        <div className="block intro">
          <p>{TAGLINE}</p>
          <p>
            mostly about my life — my favorite one so far is{" "}
            <ExternalLink href={INTRO_VIDEO.href}>
              {INTRO_VIDEO.name}
            </ExternalLink>
            .
          </p>
        </div>

        <Section title="right now">
          {RIGHT_NOW.map((line) => (
            <p className="line" key={line}>
              {line}
            </p>
          ))}
        </Section>

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

        <p className="block ps">
          p.s. {CONTACT_NOTE}{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </main>
    </>
  );
}
