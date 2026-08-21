import Link from "./Link";

/* A plain image with an optional caption. Portrait shots are held narrower so
   they don't run the full height of the screen. `href` makes both the image
   and the caption's link open the full-resolution file. */
export default function Figure({ src, alt, caption, portrait, href, hrefLabel }) {
  const img = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={portrait ? "portrait" : undefined}
    />
  );

  return (
    <figure>
      {href ? <Link href={href}>{img}</Link> : img}
      {caption || href ? (
        <figcaption>
          {caption}
          {href && hrefLabel ? (
            <>
              {caption ? " " : null}
              <Link href={href}>{hrefLabel}</Link>
            </>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
