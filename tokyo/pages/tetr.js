import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING } from "@/src/content/tetr";

export default function Tetr() {
  return (
    <Page title="TETR">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
      </div>
    </Page>
  );
}
