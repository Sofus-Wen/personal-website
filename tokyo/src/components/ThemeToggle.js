import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // private browsing — the theme still applies for this page view
    }
  }

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm5.657 3.343a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM21 11a1 1 0 110 2h-2a1 1 0 110-2h2zm-3.343 5.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM13 21a1 1 0 11-2 0v-2a1 1 0 112 0v2zm-5.657-3.343a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zM3 13a1 1 0 110-2h2a1 1 0 110 2H3zm3.343-7.657a1 1 0 010 1.414L4.93 8.171a1 1 0 11-1.414-1.414L4.93 5.343a1 1 0 011.414 0zM12 6a6 6 0 100 12 6 6 0 000-12z"
        />
      </svg>
      <style jsx>{`
        button {
          display: inline-flex;
          align-items: center;
          color: inherit;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.6;
        }

        button:focus-visible {
          outline: 2px solid var(--link);
          outline-offset: 2px;
          border-radius: 2px;
        }

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      `}</style>
    </button>
  );
}
