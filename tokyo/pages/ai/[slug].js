import Link from "@/src/components/Link";
import Page from "@/src/components/Page";
import { AI_PROJECTS } from "@/src/content";

export default function AiProject({ project }) {
  return (
    <Page title={project.name}>
      {project.video ? (
        <p className="line">
          <Link href={project.video}>video</Link>
        </p>
      ) : null}
    </Page>
  );
}

export function getStaticPaths() {
  return {
    paths: AI_PROJECTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: { project: AI_PROJECTS.find((p) => p.slug === params.slug) },
  };
}
