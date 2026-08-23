import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { BODY, INTRO, OPENING } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="NLP / hypnosis">
      {/* Same rhythm as /ai: opening under the title, a standalone line, then
          the block whose lead-in sits tight against the names. */}
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={[{ items: INTRO }]} />
        <List groups={[{ items: BODY }]} />
      </div>
    </Page>
  );
}
