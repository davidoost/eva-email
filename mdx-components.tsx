import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-zinc-800 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-zinc-600 leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-zinc-600 mb-4 space-y-1">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-zinc-100 text-zinc-800 text-sm rounded px-1.5 py-0.5 font-mono">
      {children}
    </code>
  ),
  hr: () => <hr className="my-8 border-zinc-200" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
