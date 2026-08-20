import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { ENTRIES, OPENING } from "@/src/content/ai";

export default function Ai() {
  return (
    <Page title="AI / TKS">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={ENTRIES} />
      </div>
    </Page>
  );
}
