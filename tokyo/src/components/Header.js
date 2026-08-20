import ExternalLink from "./ExternalLink";
import ThemeToggle from "./ThemeToggle";
import { NAME, NAV } from "../content";

export default function Header() {
  return (
    <header className="container">
      <div className="block">
        <div className="header-top">
          <h1>{NAME}</h1>
          <ThemeToggle />
        </div>
        <nav>
          {NAV.map((item) => (
            <ExternalLink key={item.label} href={item.href}>
              {item.label}
            </ExternalLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
