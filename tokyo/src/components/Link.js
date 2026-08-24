import NextLink from "next/link";

/* Whole sites of their own that live in /public and are reached through a
   redirect, so they have no page chunk for the router to fetch. Handing
   these to NextLink makes it 404 on the chunk before falling back to a
   real navigation, so they get a plain anchor instead. */
const STATIC_APPS = new Set(["/fuji", "/taiyo2049"]);

/* Internal routes go through the router. A path with a file extension is a
   static file in /public, so it gets a plain anchor and opens in a new tab
   like any other external artifact. */
export default function Link({ href, children }) {
  if (STATIC_APPS.has(href)) {
    return <a href={href}>{children}</a>;
  }

  const isRoute = href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);

  if (isRoute) {
    return <NextLink href={href}>{children}</NextLink>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
