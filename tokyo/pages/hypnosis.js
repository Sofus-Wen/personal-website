import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { BODY, OPENING } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="NLP / hypnosis">
      {/* Same rhythm as /ai: opening under the title, then one block. */}
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={[{ items: BODY }]} />
      </div>
    </Page>
  );
}
