import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING } from "@/src/content/hypnosis";

export default function Hypnosis() {
  return (
    <Page title="hypnosis / NLP">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
      </div>
    </Page>
  );
}
