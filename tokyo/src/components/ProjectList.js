import ExternalLink from "./ExternalLink";

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
          {" - "}
          {item.desc}
        </p>
      ))}
    </div>
  ));
}
