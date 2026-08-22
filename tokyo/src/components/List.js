import Link from "./Link";

/* Renders a string as-is, or an array of segments where {text, href} links
   part of the line. Used for both names and descriptions. */
function Segments({ value }) {
  if (!Array.isArray(value)) return value;

  return value.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <Link key={i} href={part.href}>
        {part.text}
      </Link>
    )
  );
}

/* Grouped lines in the homepage's grammar: an optional muted label, then
   "name - description" rows. A row can be a bare name, and any part of a
   name or description can be a link. */
export default function List({ groups }) {
  return groups.map((group, gi) => (
    <div className="year" key={group.label || gi}>
      {group.label ? <p className="year-label">{group.label}</p> : null}
      {group.items.map((item, i) => (
        <p className="line" key={item.key || item.name || i}>
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
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
