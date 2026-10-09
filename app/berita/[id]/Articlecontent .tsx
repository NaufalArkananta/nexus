import ReactMarkdown, { type Components } from "react-markdown";

// Isi berita disimpan sebagai Markdown.
// Blockquote: paragraf pertama = kutipan, paragraf berikutnya = label kecil.
const components: Components = {
  p: ({ children }) => (
    <p className="mt-5 text-[17px] leading-8 text-slate-600">{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-bold text-[#0f2a4d]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold text-[#0f2a4d]">{children}</h3>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600 marker:text-blue-600">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-8 text-slate-600 marker:text-blue-600">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className={[
        "my-8 rounded-r-lg border-l-4 border-blue-600 bg-emerald-50 px-7 py-6",
        "[&>p]:mt-0",
        "[&>p:first-child]:text-xl [&>p:first-child]:font-medium [&>p:first-child]:leading-8 [&>p:first-child]:text-[#0f2a4d]",
        "[&>p:not(:first-child)]:mt-3 [&>p:not(:first-child)]:text-xs [&>p:not(:first-child)]:uppercase [&>p:not(:first-child)]:leading-5 [&>p:not(:first-child)]:tracking-wide [&>p:not(:first-child)]:text-blue-700",
      ].join(" ")}
    >
      {children}
    </blockquote>
  ),
};

export default function ArticleContent({ content }: { content: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}