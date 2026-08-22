import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING } from "@/src/content/tks";

export default function Tks() {
  return (
    <Page title="TKS / toronto">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
      </div>
    </Page>
  );
}
