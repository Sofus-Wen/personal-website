import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { INTRO, OPENING, PEOPLE } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="hypnosis / NLP">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <p className="line">{INTRO}</p>
        <List groups={PEOPLE} />
      </div>
    </Page>
  );
}
