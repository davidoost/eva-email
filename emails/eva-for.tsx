export function EvaFor<T>({
  expr,
  items,
  renderItem,
}: {
  expr: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `<!--EVA_FOR:${expr}-->` }} />
      {items[0] !== undefined && renderItem(items[0], 0)}
      <div dangerouslySetInnerHTML={{ __html: `<!--/EVA_FOR-->` }} />
      {items.length > 1 && (
        <>
          <div dangerouslySetInnerHTML={{ __html: `<!--EVA_FOR_PREVIEW-->` }} />
          {items.slice(1).map((item, i) => renderItem(item, i + 1))}
          <div dangerouslySetInnerHTML={{ __html: `<!--/EVA_FOR_PREVIEW-->` }} />
        </>
      )}
    </>
  );
}
