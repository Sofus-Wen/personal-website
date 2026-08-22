import Carousel from "@/src/components/Carousel";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, OPENING, SLIDES } from "@/src/content/india";

export default function India() {
  return (
    <Page title="india">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
        <Carousel slides={SLIDES} />
      </div>
    </Page>
  );
}
