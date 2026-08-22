import Carousel from "@/src/components/Carousel";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING, SLIDES } from "@/src/content/dubai";

export default function Dubai() {
  return (
    <Page title="dubai">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
        <Carousel slides={SLIDES} />
      </div>
    </Page>
  );
}
