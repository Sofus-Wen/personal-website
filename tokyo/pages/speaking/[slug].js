import Page from "@/src/components/Page";
import { TALKS } from "@/src/content";

export default function Talk({ talk }) {
  return <Page title={talk.name} />;
}

export function getStaticPaths() {
  return {
    paths: TALKS.map((t) => ({ params: { slug: t.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { talk: TALKS.find((t) => t.slug === params.slug) } };
}
