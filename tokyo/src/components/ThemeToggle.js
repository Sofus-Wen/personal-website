import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // private browsing — the theme still applies for this page view
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "light" : "dark"}
      <style jsx>{`
        button {
          font: inherit;
          color: var(--link);
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        button:hover {
          color: var(--link-hover);
          text-decoration: underline;
        }

        button:focus-visible {
          outline: 2px solid var(--link);
          outline-offset: 2px;
          border-radius: 2px;
        }
      `}</style>
    </button>
  );
}
