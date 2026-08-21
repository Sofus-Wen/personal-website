import Carousel from "@/src/components/Carousel";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING, SITE, SLIDES } from "@/src/content/taiyo";

export default function Taiyo() {
  return (
    <Page title="Taiyo / fashion school">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
        <List groups={SITE} />
        <Carousel slides={SLIDES} />
      </div>
    </Page>
  );
}
