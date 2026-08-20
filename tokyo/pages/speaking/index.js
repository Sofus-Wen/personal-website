import EntryList from "@/src/components/EntryList";
import Page from "@/src/components/Page";
import { TALKS } from "@/src/content";

export default function Speaking() {
  return (
    <Page title="speaking">
      <EntryList
        entries={TALKS.map((t) => ({
          ...t,
          prefix: t.year,
          href: `/speaking/${t.slug}`,
        }))}
      />
    </Page>
  );
}
