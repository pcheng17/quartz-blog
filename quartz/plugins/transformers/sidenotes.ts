import { QuartzTransformerPlugin } from "../types"

// Note content may include wikilinks ([[target]] / [[target|alias]]),
// markdown links ([text](url)), and any other bracket-free text. Notes
// cannot span multiple lines.
const noteContent = String.raw`(?:[^\[\]\n]|\[\[[^\[\]\n]*\]\]|\[[^\[\]\n]*\](?:\([^()\n]*\))?)*`

// ^[note text] -> numbered sidenote. The (?!\() lookahead keeps a bare
// caret followed by a real markdown link (e.g. "^[link text](url)") intact.
const sidenoteRegex = new RegExp(String.raw`\^\[(${noteContent})\](?!\()`, "g")

// >[note text] -> unnumbered marginnote. Same lookahead, guarding against
// a bare ">" followed by a real markdown link.
const marginnoteRegex = new RegExp(String.raw`>\[(${noteContent})\](?!\()`, "g")

// Fenced code blocks and inline code, captured so split() preserves them.
const codeRegex = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g

/**
 * Rewrites ^[text] and >[text] into the Tufte sidenote / marginnote HTML
 * that custom.scss styles. Runs on raw markdown source, so the note text
 * is still parsed as markdown (bold, wikilinks, LaTeX all work inside
 * notes).
 *
 * The caret sits outside the brackets, so this cannot collide with GFM
 * footnote reference syntax ([^label], caret inside the brackets) — real
 * footnotes are left untouched.
 */
export const Sidenotes: QuartzTransformerPlugin = () => ({
  name: "Sidenotes",
  textTransform(_ctx, src) {
    return src
      .split(codeRegex)
      .map((segment, i) => {
        // Odd indices are the captured code segments — leave untouched.
        if (i % 2 === 1) return segment
        return segment
          .replace(sidenoteRegex, (match, content: string) =>
            content.trim() !== ""
              ? `<label class="sidenote-number"></label><span class="sidenote">${content}</span>`
              : match,
          )
          .replace(marginnoteRegex, (match, content: string) =>
            content.trim() !== "" ? `<span class="marginnote">${content}</span>` : match,
          )
      })
      .join("")
  },
})
