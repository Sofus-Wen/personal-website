import Figure from "@/src/components/Figure";
import List from "@/src/components/List";
import Page from "@/src/components/Page";
import { GROUPS, IMAGES, OPENING } from "@/src/content/taiyo";

export default function Taiyo() {
  return (
    <Page title="Taiyo / fashion school">
      <p className="line">{OPENING}</p>
      <div className="stack">
        <List groups={GROUPS} />
        <div className="figures">
          {IMAGES.map((image) => (
            <Figure key={image.src} {...image} />
          ))}
        </div>
      </div>
    </Page>
  );
}
