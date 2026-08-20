import Link from "./Link";

/* A simple index: one linked entry per line, optionally prefixed with a year.
   Entries without a year still line up, so a missing date costs nothing. */
export default function EntryList({ entries }) {
  return entries.map((entry) => (
    <p className="line" key={entry.slug}>
      {entry.prefix ? <span className="year-label">{entry.prefix} - </span> : null}
      <Link href={entry.href}>{entry.name}</Link>
      {entry.location ? <span className="year-label">{` · ${entry.location}`}</span> : null}
    </p>
  ));
}
