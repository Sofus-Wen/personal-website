import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING } from "@/src/content/taiyo";

export default function Taiyo() {
  return (
    <Page title="Taiyo">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
      </div>
    </Page>
  );
}
