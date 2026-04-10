function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value as Record<string, unknown>, path));
      } else if (typeof value === "string" && value.length >= 3) {
        acc[path] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function injectTemplateVars(
  html: string,
  data: Record<string, unknown>,
): string {
  const flat = flattenObject(data);

  // Sort longest values first to avoid partial replacements
  const entries = Object.entries(flat).sort(([, a], [, b]) => b.length - a.length);

  let result = html;
  for (const [path, value] of entries) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(escaped, "g"), `{{>${path}}}`);
  }

  return result;
}
