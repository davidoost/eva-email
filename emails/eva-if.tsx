/**
 * Wraps children with EVA conditional markers.
 * In the preview: renders normally via the `show` prop (React conditional).
 * In the copied HTML: markers are replaced with {{if expr}}...{{/if}} by post-processing.
 */
export function EvaIf({ expr, show, children }: { expr: string; show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `<!--EVA_IF:${expr}-->` }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: `<!--/EVA_IF-->` }} />
    </>
  );
}
