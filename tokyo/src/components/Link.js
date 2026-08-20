import NextLink from "next/link";

/* Internal hrefs route client-side and stay in the tab; anything else is
   treated as external. */
export default function Link({ href, children }) {
  if (href.startsWith("/")) {
    return <NextLink href={href}>{children}</NextLink>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
