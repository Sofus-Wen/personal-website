import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { INTRO, PEOPLE } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="NLP / hypnosis">
      <div className="stack">
        <List groups={[{ items: INTRO }, PEOPLE]} />
      </div>
    </Page>
  );
}
