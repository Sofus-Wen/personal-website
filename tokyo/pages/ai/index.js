import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { INTRO, OPENING, OUTRO, PROJECTS } from "@/src/content/ai";

export default function Ai() {
  return (
    <Page title="AI">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={[{ items: INTRO }]} />
        <List groups={[{ items: PROJECTS }]} />
        <List groups={[{ items: OUTRO }]} />
      </div>
    </Page>
  );
}
