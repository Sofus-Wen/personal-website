/* Guards against lines wrapping ("flopping") on desktop.
 *
 * The content column is 48rem = 768px and body text is 17px from 1024px up.
 * Measured in the browser, Manrope at 17px runs about 7.8px per character, so
 * 768px is roughly 98 characters. The cap below sits just under that.
 *
 * This reads the built HTML rather than the content source, so it sees each
 * line exactly as rendered, including "name - description" joins and text
 * split across linked segments.
 *
 * Note: this is a desktop guard. Narrow screens cannot fit a long sentence at
 * any width, and those wrap by design with a hanging indent.
 */
const fs = require("fs");
const path = require("path");

const MAX_CHARS = 96;
const DIST = path.join(__dirname, "..", ".next-check", "server", "pages");

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

function lines(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/);
  if (!main) return [];
  return [...main[0].matchAll(/<p class="line[^"]*">([\s\S]*?)<\/p>/g)].map((m) =>
    m[1]
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2019;/g, "’")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim()
  );
}

const files = htmlFiles(DIST);
if (!files.length) {
  console.error("no built pages found, run `npm run build:check` first");
  process.exit(1);
}

const tooLong = [];
for (const file of files) {
  const route = "/" + path.relative(DIST, file).replace(/\.html$/, "");
  for (const line of lines(fs.readFileSync(file, "utf8"))) {
    if (line.length > MAX_CHARS) tooLong.push({ route, len: line.length, line });
  }
}

if (tooLong.length) {
  console.error(`\n${tooLong.length} line(s) over ${MAX_CHARS} chars, these wrap on desktop:\n`);
  for (const { route, len, line } of tooLong) {
    console.error(`  ${route}  (${len})\n    ${line}\n`);
  }
  process.exit(1);
}

console.log(`lines ok, ${files.length} pages, none over ${MAX_CHARS} chars`);
