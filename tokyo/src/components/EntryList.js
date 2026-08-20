import Link from "./Link";

/* A simple index: one linked entry per line, optionally prefixed. */
export default function EntryList({ entries }) {
  return entries.map((entry) => (
    <p className="line" key={entry.slug}>
      {entry.prefix ? `${entry.prefix} - ` : null}
      <Link href={entry.href}>{entry.name}</Link>
    </p>
  ));
}
