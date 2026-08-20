import EntryList from "@/src/components/EntryList";
import Page from "@/src/components/Page";
import { TALKS } from "@/src/content/speaking";

export default function Speaking() {
  return (
    <Page title="speaking">
      <EntryList
        entries={TALKS.map((talk) => ({
          ...talk,
          prefix: talk.year,
          href: `/speaking/${talk.slug}`,
        }))}
      />
    </Page>
  );
}
