import { useRouter } from "next/router";
import Link from "./Link";
import ThemeToggle from "./ThemeToggle";
import { NAME, NAV } from "../content";

export default function Header() {
  const { pathname } = useRouter();
  const atHome = pathname === "/";

  return (
    <header className="container">
      <div className="block">
        <div className="header-top">
          <h1>{NAME}</h1>
          <ThemeToggle />
        </div>
        <nav>
          {/* Marks the current page rather than linking to it, as the
              reference does. */}
          {atHome ? <span className="here">home</span> : <Link href="/">home</Link>}
          {NAV.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
