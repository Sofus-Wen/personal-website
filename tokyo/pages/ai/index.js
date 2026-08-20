import EntryList from "@/src/components/EntryList";
import Page from "@/src/components/Page";
import { AI_PROJECTS } from "@/src/content";

export default function Ai() {
  return (
    <Page title="ai">
      <EntryList
        entries={AI_PROJECTS.map((p) => ({ ...p, href: `/ai/${p.slug}` }))}
      />
    </Page>
  );
}
