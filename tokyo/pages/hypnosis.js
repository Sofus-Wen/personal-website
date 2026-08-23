import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { OPENING, PEOPLE } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="NLP / hypnosis">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={[{ items: PEOPLE }]} />
      </div>
    </Page>
  );
}
