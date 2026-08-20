import ExternalLink from "./ExternalLink";

/* A description is either a plain string, or an array of segments where a
   segment may be {text, href} to link part of the line. */
function Description({ desc }) {
  if (!Array.isArray(desc)) return desc;

  return desc.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <ExternalLink key={i} href={part.href}>
        {part.text}
      </ExternalLink>
    )
  );
}

export default function ProjectList({ groups }) {
  return groups.map((group) => (
    <div className="year" key={group.year}>
      <p className="year-label">{group.year}</p>
      {group.items.map((item) => (
        <p className="line" key={item.name}>
          {item.href ? (
            <ExternalLink href={item.href}>{item.name}</ExternalLink>
          ) : (
            item.name
          )}
          {item.desc ? " - " : null}
          <Description desc={item.desc} />
        </p>
      ))}
    </div>
  ));
}
