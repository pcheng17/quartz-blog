import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, joinSegments, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

interface Section {
  title: string
  folder: string
  limit?: number
  linkText?: string
}

interface Options {
  sections: Section[]
  dateType: "created" | "modified" | "published"
}

const defaultOptions: Options = {
  sections: [
    { title: "Blog", folder: "blog", limit: 5, linkText: "all posts" },
    { title: "Notes", folder: "notes", limit: 5, linkText: "all notes" },
  ],
  dateType: "created",
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const fileDate = (f: QuartzPluginData): Date | undefined =>
    f.dates?.[opts.dateType] ?? f.dates?.created ?? f.dates?.modified

  const RecentLists: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    return (
      <nav class={classNames(displayClass, "recent-lists")}>
        {opts.sections.map((section) => {
          const prefix = `${section.folder}/`
          const folderSlug = joinSegments(section.folder, "index") as FullSlug
          const pages = allFiles
            .filter(
              (f) =>
                f.slug?.startsWith(prefix) &&
                !f.slug.endsWith("/index") &&
                (f.frontmatter as Record<string, unknown> | undefined)?.unlisted !== true,
            )
            .sort((a, b) => (fileDate(b)?.getTime() ?? 0) - (fileDate(a)?.getTime() ?? 0))
            .slice(0, section.limit ?? 5)

          if (pages.length === 0) {
            return null
          }

          return (
            <div class="recent-section">
              <h2>{section.title}</h2>
              <ul>
                {pages.map((page) => (
                  <li>
                    <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                      {page.frontmatter?.title ?? page.slug}
                    </a>
                  </li>
                ))}
              </ul>
              <a class="see-all" href={resolveRelative(fileData.slug!, folderSlug)}>
                {section.linkText ?? "all"} &rarr;
              </a>
            </div>
          )
        })}
      </nav>
    )
  }

  RecentLists.css = `
.recent-lists {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.recent-lists .recent-section h2 {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gray);
  margin: 0 0 0.5rem 0;
}

.recent-lists .recent-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.recent-lists .recent-section li {
  margin: 0.35rem 0;
  line-height: 1.4;
}

.recent-lists .recent-section a.internal {
  background-color: transparent;
}

.recent-lists .recent-section a.see-all {
  display: inline-block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--gray);
}
`

  return RecentLists
}) satisfies QuartzComponentConstructor<Partial<Options>>
