import Carousel from "@/src/components/Carousel";
import Flow from "@/src/components/Flow";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import {
  CONTEXT,
  OPENING,
  SLIDES,
  STEPS,
  STEPS_LABEL,
  TEAM,
} from "@/src/content/fuji";

export default function FujiChocolates() {
  return (
    <Page title="Fuji Chocolates">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={CONTEXT} />
        <List groups={TEAM} />
        <div className="year">
          <p className="year-label">{STEPS_LABEL}</p>
          <Flow steps={STEPS} />
        </div>
        <Carousel slides={SLIDES} />
      </div>
    </Page>
  );
}
