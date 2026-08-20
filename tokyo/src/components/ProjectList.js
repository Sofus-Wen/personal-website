import ExternalLink from "./ExternalLink";

/* Renders a string as-is, or an array of segments where {text, href} links
   part of the line. Used for both names and descriptions. */
function Segments({ value }) {
  if (!Array.isArray(value)) return value;

  return value.map((part, i) =>
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
        <p className="line" key={item.key || item.name}>
          {item.href ? (
            <ExternalLink href={item.href}>{item.name}</ExternalLink>
          ) : (
            <Segments value={item.name} />
          )}
          {item.desc ? " - " : null}
          <Segments value={item.desc} />
        </p>
      ))}
    </div>
  ));
}
