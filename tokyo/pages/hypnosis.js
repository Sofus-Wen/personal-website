import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { INTRO, OPENING, PEOPLE } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="NLP / hypnosis">
      {/* Same rhythm as /ai: the opening sits under the title, then one block
          whose lead-in is tight against the names it introduces, the way
          "started building things:" sits over the projects there. */}
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={[{ items: [...INTRO, ...PEOPLE] }]} />
      </div>
    </Page>
  );
}
