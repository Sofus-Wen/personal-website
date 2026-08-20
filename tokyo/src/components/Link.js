import NextLink from "next/link";

/* Internal routes go through the router. A path with a file extension is a
   static file in /public, so it gets a plain anchor and opens in a new tab
   like any other external artifact. */
export default function Link({ href, children }) {
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
