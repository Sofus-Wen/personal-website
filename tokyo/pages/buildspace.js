import Carousel from "@/src/components/Carousel";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING, SLIDES } from "@/src/content/buildspace";

export default function Buildspace() {
  return (
    <Page title="building with Mats & Pranava">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
        <Carousel slides={SLIDES} />
      </div>
    </Page>
  );
}
