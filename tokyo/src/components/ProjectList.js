import ExternalLink from "./ExternalLink";

/* One chronological list. A row is "name - description", where the name is a
   link when there is somewhere to send people. Rows without a description
   render as just the name. */
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
          {item.desc ? ` - ${item.desc}` : null}
        </p>
      ))}
    </div>
  ));
}
