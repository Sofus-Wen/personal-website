import Link from "@/src/components/Link";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { TALKS } from "@/src/content/speaking";

export default function Talk({ talk }) {
  const facts = [talk.year, talk.location].filter(Boolean).join(" · ");

  return (
    <Page title={talk.name}>
      {facts ? <p className="line year-label">{facts}</p> : null}
      <div className="stack">
        {talk.lines ? (
          <List groups={[{ items: talk.lines.map((line) => ({ name: line })) }]} />
        ) : null}
        {/* Add `video: "<url>"` to a talk and the link appears here. */}
        {talk.video ? (
          <p className="line">
            <Link href={talk.video}>video</Link>
          </p>
        ) : null}
      </div>
    </Page>
  );
}

export function getStaticPaths() {
  return {
    paths: TALKS.map((talk) => ({ params: { slug: talk.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { talk: TALKS.find((t) => t.slug === params.slug) } };
}
